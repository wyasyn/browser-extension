// Type declaration for JSON module imports
declare module "*.json" {
  const value: unknown;
  export default value;
}

// More specific declaration for extensions.json
declare module "data/extensions.json" {
  interface ExtensionData {
    id?: string;
    logo: string;
    name: string;
    description: string;
    isActive: boolean;
  }

  const extensions: ExtensionData[];
  export default extensions;
}
