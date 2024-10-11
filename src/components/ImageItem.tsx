import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  width: number;
  height: number;
  onClick: () => void;
  image?: string;
  link?: string;
};

export default function ImageItem({
  width,
  height,
  onClick,
  image,
  link,
}: Props) {
  const handleClick = () => {
    console.log("handleClick");
    if (link) {
      window.open(link, "_blank");
    } else {
      onClick();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`image-placeholder border-2 border-dashed border-gray-300 flex justify-center items-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          style={{ width: `${width}px`, height: `${height}px` }}
          onClick={handleClick}
        >
          {image ? (
            <img
              src={image}
              alt="이미지"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span className="text-6xl text-gray-300">+</span>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add News</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Image
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Link
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Save
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
