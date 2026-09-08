export interface TalentImageMapping {
  id: string;
  mainImage: string;
  portfolio: string[];
}

export const INEGA_TALENT_IMAGES: Record<string, TalentImageMapping> = {
  "ananya-deshmukh": {
    id: "ananya-deshmukh",
    mainImage: "/images/talents/inega/actors/female/female-actor-1.png",
    portfolio: [
      "/images/talents/inega/actors/female/female-actor-1.png",
      "/images/talents/inega/actors/female/female-actor-2.jpg",
      "/images/talents/inega/actors/female/female-actor-3.jpg",
      "/images/talents/inega/actors/female/female-actor-4.jpg"
    ]
  },
  "priya-kapoor": {
    id: "priya-kapoor",
    mainImage: "/images/talents/inega/actors/female/female-actor-2.jpg",
    portfolio: [
      "/images/talents/inega/actors/female/female-actor-2.jpg",
      "/images/talents/inega/actors/female/female-actor-1.png",
      "/images/talents/inega/actors/female/female-actor-3.jpg",
      "/images/talents/inega/actors/female/female-actor-4.jpg"
    ]
  },
  "rahul-mehra": {
    id: "rahul-mehra",
    mainImage: "/images/talents/inega/actors/male/male-actor-1.png",
    portfolio: [
      "/images/talents/inega/actors/male/male-actor-1.png",
      "/images/talents/inega/actors/male/male-actor-2.jpg",
      "/images/talents/inega/actors/male/male-actor-3.jpg",
      "/images/talents/inega/actors/male/male-actor-4.jpg"
    ]
  },
  "arjun-verma": {
    id: "arjun-verma",
    mainImage: "/images/talents/inega/actors/male/male-actor-2.jpg",
    portfolio: [
      "/images/talents/inega/actors/male/male-actor-2.jpg",
      "/images/talents/inega/actors/male/male-actor-1.png",
      "/images/talents/inega/actors/male/male-actor-3.jpg",
      "/images/talents/inega/actors/male/male-actor-4.jpg"
    ]
  }
};
