import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import {
  eachMonthOfInterval,
  endOfMonth,
  format,
  formatDistanceToNow,
  startOfMonth,
} from "date-fns";
import { and, count, desc, eq, gte, lte, sql } from "drizzle-orm";
import {
  Calendar,
  CreditCard,
  DollarSign,
  PersonStandingIcon,
  UserPlus,
  UserRoundCheck,
} from "lucide-react";
import BarChart from "@/app/(root)/(routes)/dashboard/_components/barchart";
import {
  DashboardCard,
  DashboardCardContent,
} from "@/app/(root)/(routes)/dashboard/_components/dashboard-card";
import GoalDataCard from "@/app/(root)/(routes)/dashboard/_components/goal";
import LineGraph from "@/app/(root)/(routes)/dashboard/_components/line-graph";
import UserDataCard, { UserDataProps } from "@/app/(root)/(routes)/dashboard/_components/user-data-card";
import UserPurchaseDataCard, {
  UserPurchaseDataProps,
} from "@/app/(root)/(routes)/dashboard/_components/user-purchase-data";

import { currentSession } from "@/lib/api/user";
import { forbidden, unauthorized } from "next/navigation";

type Purchase = typeof schema.purchases.$inferSelect;
type User = typeof schema.users.$inferSelect;
type PurchaseWithUser = Purchase & { user: User };

export default async function DashboardView() {
  // create an account and make your role an admin in the prisma studio so you can access the dashboard and no one else.

  const { user } = await currentSession();

  if (!user) {
    unauthorized();
  }

  if (user.role !== "admin") {
    forbidden();
  }

  const currentDate = new Date();

  // Fetch user count
  const userCount = await db.select().from(schema.users);

  // Fetch new users count for the current month
  const newUsersCount = await db
    .select({ count: count() })
    .from(schema.users)
    .where(
      and(
        gte(schema.users.createdAt, startOfMonth(currentDate)),
        lte(schema.users.createdAt, endOfMonth(currentDate))
      )
    );

  // Fetch total sales count
  const salesCountResult = await db
    .select({ count: count() })
    .from(schema.purchases);
  const salesCount = salesCountResult[0]?.count || 0;

  // Fetch total sales amount
  const totalAmountResult = await db
    .select({
      total: sql<number>`sum(${schema.purchases.amount})`,
    })
    .from(schema.purchases);
  const totalAmount = totalAmountResult[0]?.total || 0;

  const goalAmount = 100;
  const progressValue = (totalAmount / goalAmount) * 100;

  // Fetch recent users
  const recentUsers = await db
    .select()
    .from(schema.users)
    .orderBy(desc(schema.users.createdAt))
    .limit(7);

  const userData: UserDataProps[] = recentUsers.map((account) => ({
    name: account.name || "Unknown",
    email: account.email || "No email",
    image: account.image || "/mesh.avif",
    time: formatDistanceToNow(new Date(account.createdAt), { addSuffix: true }),
  }));

  // Fetch recent purchases with user info
  const recentPurchases = await db
    .select({
      purchase: schema.purchases,
      user: schema.users,
    })
    .from(schema.purchases)
    .innerJoin(schema.users, eq(schema.purchases.userId, schema.users.id))
    .orderBy(desc(schema.purchases.createdAt))
    .limit(5);

  const userPurchaseData: UserPurchaseDataProps[] = recentPurchases.map(
    ({ purchase, user }) => ({
      name: user?.name || "Unknown",
      email: user?.email || "No email",
      image: user?.image || "/mesh.avif",
      saleAmount: `+$${(Number(purchase.amount) || 0).toFixed(2)}`,
    })
  );

  // Get the earliest date for time series data
  const earliestUserDate = await db
    .select({ createdAt: schema.users.createdAt })
    .from(schema.users)
    .orderBy(schema.users.createdAt)
    .limit(1);

  const startDate =
    earliestUserDate[0]?.createdAt ||
    new Date(new Date().setMonth(new Date().getMonth() - 6));

  // Group users by month for the chart
  const monthlyUserData = await Promise.all(
    eachMonthOfInterval({
      start: startOfMonth(new Date(startDate)),
      end: endOfMonth(currentDate),
    }).map(async (month) => {
      const monthString = format(month, "MMM");
      const startMonthDate = startOfMonth(month);
      const endMonthDate = endOfMonth(month);

      const usersInMonth = await db
        .select({ count: count() })
        .from(schema.users)
        .where(
          and(
            gte(schema.users.createdAt, startMonthDate),
            lte(schema.users.createdAt, endMonthDate)
          )
        );

      return { month: monthString, users: usersInMonth[0]?.count || 0 };
    })
  );

  // Group sales by month for the chart
  const monthlySalesData = await Promise.all(
    eachMonthOfInterval({
      start: startOfMonth(new Date(startDate)),
      end: endOfMonth(currentDate),
    }).map(async (month) => {
      const monthString = format(month, "MMM");
      const startMonthDate = startOfMonth(month);
      const endMonthDate = endOfMonth(month);

      const salesInMonth = await db
        .select({
          total: sql<number>`sum(${schema.purchases.amount})`,
        })
        .from(schema.purchases)
        .where(
          and(
            gte(schema.purchases.createdAt, startMonthDate),
            lte(schema.purchases.createdAt, endMonthDate)
          )
        );

      return { month: monthString, total: salesInMonth[0]?.total || 0 };
    })
  );

  return (
    <div className="flex flex-col gap-10 w-full mt-20 mb-12">
      <h1 className="font-bold text-4xl text-center">Dashboard</h1>
      <div className="flex flex-col gap-6 w-full">
        {/* Dashboard Cards */}
        <section className="grid w-full grid-cols-1 gap-6 transition-all sm:grid-cols-2 md:grid-cols-4">
          <DashboardCard
            label="Revenue"
            Icon={DollarSign}
            amount={`$${totalAmount}`}
            description="All time"
          />
          <DashboardCard
            label="Total Paid Subscriptions"
            Icon={Calendar}
            amount={`+${salesCount}`}
            description="All time"
          />
          <DashboardCard
            label="Total Users"
            Icon={PersonStandingIcon}
            amount={`+${userCount.length}`}
            description="All time"
          />
          <DashboardCard
            label="Users This Month"
            Icon={UserPlus}
            amount={`+${newUsersCount[0]?.count || 0}`}
            description="This month"
          />
        </section>
        {/* User Data and Purchase Data Cards */}
        <section className="grid grid-cols-1 gap-6 transition-all lg:grid-cols-2 text-primary">
          <DashboardCardContent>
            <section className="flex justify-between gap-2 text-black dark:text-white pb-2">
              <p>Recent Users</p>
              <UserRoundCheck className="h-4 w-4" />
            </section>
            {userData.map((data, index) => (
              <UserDataCard
                key={`user-${index}`}
                email={data.email}
                name={data.name}
                image={data.image}
                time={data.time}
              />
            ))}
          </DashboardCardContent>
          <DashboardCardContent>
            <section className="flex justify-between gap-2 text-black dark:text-white pb-2">
              <p>Recent Sales</p>
              <CreditCard className="h-4 w-4" />
            </section>

            {userPurchaseData.map((data, index) => (
              <UserPurchaseDataCard
                key={`purchase-${index}`}
                email={data.email}
                image={data.image}
                name={data.name}
                saleAmount={data.saleAmount}
              />
            ))}
          </DashboardCardContent>
        </section>

        <section className="grid grid-cols-1 gap-6 transition-all lg:grid-cols-2 text-black dark:text-white">
          <LineGraph data={monthlyUserData} />
          <BarChart data={monthlySalesData} />
        </section>

        <GoalDataCard goal={goalAmount} value={progressValue} />
      </div>
    </div>
  );
} 