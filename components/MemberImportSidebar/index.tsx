import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useRef } from "react";
import { DOCX_MIMETYPE, DOC_MIMETYPE } from "../../shared/constants";
import { Dropzone } from "../Dropzone";

type MemberImportSidebarProps = {
  file?: File;
  setFile: (file: File) => void;
  isOpen: boolean;
  onClose: () => void;
  handleUploadClick: () => void;
  loading: boolean;
};

export const MemberImportSidebar: React.FC<MemberImportSidebarProps> = ({
  file,
  setFile,
  isOpen,
  onClose,
  handleUploadClick,
  loading,
}) => {
  const btnRef = useRef();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Importar Membro via Arquivo</DrawerHeader>

        <DrawerBody>
          <Dropzone
            file={file}
            setFile={setFile}
            permittedMimeTypes={[DOC_MIMETYPE, DOCX_MIMETYPE]}
          />
        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme="blue"
            isFullWidth
            onClick={handleUploadClick}
            isLoading={loading}
          >
            Enviar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
