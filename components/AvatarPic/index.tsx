import { Avatar, AvatarProps, Box } from "@chakra-ui/react";

type AvatarPicProps = {
  name: string;
  url?: string;
  // eslint-disable-next-line no-unused-vars
  onUpload?: (file: File) => void;
} & AvatarProps;

export const AvatarPic: React.FC<AvatarPicProps> = ({
  name,
  onUpload,
  ...rest
}) => {
  function handleOpenFileUpload() {
    if (!onUpload) {
      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      // @ts-ignore
      const file = event.target?.files?.[0];
      if (file) {
        onUpload(file);
      }
    };
    input.click();
  }

  return (
    <Box>
      <Avatar
        cursor={"pointer"}
        name={name}
        {...rest}
        onClick={handleOpenFileUpload}
      />
    </Box>
  );
};
