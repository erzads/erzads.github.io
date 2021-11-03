interface Asteroid {}

interface Log {
  source: string;
  message: string;
  type: "SUCCESS" | "INFO" | "FAILURE";
}

interface Material {
  name:string;
  description:string;
  type: "A" | "B" | "C"
}

interface Equipment {
  id: string;
  name:string;
  description:string;
  quantity: number;
  baseCost: Map<Material, number>;
}