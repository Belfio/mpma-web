// import { Document, Packer } from 'docx';
// const pdf = require("pdf-parse");
import pdfParse from "pdf-parse";

export const pdfToJson = async (dataBuffer: Buffer) => {
  pdfParse(dataBuffer)
    .then(function (data: PdfData) {
      // use data
      console.log(data.text);
      return data;
    })
    .catch(function (error: Error) {
      // handle exceptions
      console.log(error);
    });
};
type PdfData = {
  numpages: number;
  numrender: number;
  info: any;
  metadata: any;
  version: string;
  text: string;
};
