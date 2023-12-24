import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface Props {
  onValueChange: (value: string) => void;
}

const TripType = ({ onValueChange }: Props) => {
  return (
    <RadioGroup onValueChange={onValueChange} defaultValue="return">
      <div className="flex items-center gap-2 ">
        <div className="flex items-center flex-1 space-x-2 ">
          <RadioGroupItem
            onChange={(e) => console.log(e)}
            value="return"
            id="return"
          />
          <Label htmlFor="return" className="">
            Return trip
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            onChange={(e) => console.log(e)}
            value="oneway"
            id="oneway"
          />
          <Label htmlFor="oneway" className="w-16">
            One way
          </Label>
        </div>
      </div>
    </RadioGroup>
  );
};

export default TripType;
