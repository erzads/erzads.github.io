interface Asteroid {}

interface Log {
  source: string;
  message: string;
  type: "SUCCESS" | "INFO" | "FAILURE";
}

interface Material {
  name: string;
  description: string;
  type: "A" | "B" | "C";
}

interface Buyable {
  id: string;
  name: string;
  description: string;
  effects: string[];
  quantity: number;
  baseCost: Map<Material, number>;
}

interface GameState {
  distance: number;
  lastLoopTime: number;
  storageMaterials: { key: "A" | "B" | "C"; value: number }[];
  equipments: { key: string; value: number }[];
  modules: { key: string; value: number }[];
}
