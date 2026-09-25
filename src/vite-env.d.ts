/// <reference types="vite/client" />

declare module "*.docx" {
  const content: string;
  export default content;
}
