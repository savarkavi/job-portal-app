import { RecruiterProfile } from "@/app/generated/prisma";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

interface RecruiterProfileCardProps {
  selectedRecruiterProfile: RecruiterProfile;
  recruiterProfiles: RecruiterProfile[] | undefined;
  onRecruiterProfileChange: (recruiterProfile: RecruiterProfile | null) => void;
}

const RecruiterProfileCard = ({
  selectedRecruiterProfile,
  recruiterProfiles,
  onRecruiterProfileChange,
}: RecruiterProfileCardProps) => {
  return (
    <Card className="my-10 h-fit w-full max-w-xl">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl xl:text-3xl">Company details</CardTitle>
        {recruiterProfiles && (
          <Select
            value={
              selectedRecruiterProfile ? selectedRecruiterProfile.id : undefined
            }
            onValueChange={(value) => {
              const selected = recruiterProfiles.find(
                (item) => item.id === value,
              );
              if (selected && onRecruiterProfileChange) {
                onRecruiterProfileChange(selected);
              }
            }}
          >
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="select company" />
            </SelectTrigger>
            <SelectContent className="text-sm">
              {recruiterProfiles.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.companyName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent className="mt-4 flex flex-col gap-4">
        <div className="flex flex-col">
          <p className="font-semibold xl:text-xl">Company name:</p>
          <p className="">{selectedRecruiterProfile.companyName}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold xl:text-xl">Location:</p>
          <p className="">{selectedRecruiterProfile.location}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold xl:text-xl">About:</p>
          <p className="">{selectedRecruiterProfile.about}</p>
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex items-center justify-center">
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => onRecruiterProfileChange(null)}
        >
          Create new Company
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecruiterProfileCard;
