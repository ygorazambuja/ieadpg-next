import { Box } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiFile } from "react-icons/fi";

import styles from "./styles.module.css";

type DropzoneProps = {
  file?: File;
  permittedMimeTypes: string[];
  // eslint-disable-next-line no-unused-vars
  setFile: (file: File) => void;
};

export function Dropzone({ file, permittedMimeTypes, setFile }: DropzoneProps) {
  const onDrop = useCallback(
    // @ts-ignore
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const [seletecFile] = acceptedFiles;
        if (permittedMimeTypes.includes(seletecFile.type)) {
          setFile(seletecFile);
        }
      }
    },
    [permittedMimeTypes, setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // @ts-ignore
    accept: permittedMimeTypes?.join(","),
  });

  return (
    <Box {...getRootProps()} as="button" className={styles.dropzone}>
      <input {...getInputProps()} />
      {file && (
        <Box className={styles.file}>
          <Box className={styles.fileName}>
            <FiFile size={20} />
            {file.name}
          </Box>
        </Box>
      )}
      {isDragActive && <p>Solte os arquivos aqui</p>}
      {!file && !isDragActive && (
        <p>Clique para adicionar, ou arraste e solte</p>
      )}
    </Box>
  );
}
