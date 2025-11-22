import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

type CloudProvider = "aws" | "gcp" | "azure";

interface CloudProviderSelectProps {
  selectedProvider: CloudProvider;
  onSelectProvider: (provider: CloudProvider) => void;
}

export function CloudProviderSelect({
  selectedProvider,
  onSelectProvider,
}: CloudProviderSelectProps) {
  return (
    <RadioGroup
      value={selectedProvider}
      onValueChange={onSelectProvider as (value: string) => void}
      className="flex space-x-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="aws" id="aws" />
        <Label
          htmlFor="aws"
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Image src="/aws.png" alt="AWS" width={30} height={30} />
          <span>AWS</span>
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="gcp" id="gcp" />
        <Label
          htmlFor="gcp"
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Image src="/gcp.png" alt="Google Cloud" width={30} height={30} />
          <span>Google Cloud</span>
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="azure" id="azure" />
        <Label
          htmlFor="azure"
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Image src="/azure.png" alt="Azure" width={30} height={30} />
          <span>Azure</span>
        </Label>
      </div>
    </RadioGroup>
  );
}
