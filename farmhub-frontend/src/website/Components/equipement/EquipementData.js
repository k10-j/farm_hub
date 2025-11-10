import equipementImg from "../../../assets/images/equipement.png";

const equipmentData = [
  {
    id: "ee41866a-8a41-4bbb-91d8-920d724b146d",
    name: "John Deere 8R Tractor",
    type: "Tractor",
    hourlyRate: 75.5,
    dailyRate: 600.0,
    location: "Main Farm, Eldoret",
    availability: "AVAILABLE",
    image: equipementImg,
    owner: {
      id: "0646f2a3-c87b-4bf2-8b8e-20b343dcaad2",
      name: "Test User",
      email: "testuser5@example.com",
      phone: "1234567890",
    },
  },
  {
    id: "631f39f5-0346-4f06-8066-2d926ddc6900",
    name: "Irrigation Helper 8R Tractor",
    type: "Tractor Bus",
    hourlyRate: 75.5,
    dailyRate: 600.0,
    location: "Main Farm, Eldoret",
    availability: "AVAILABLE",
   image: equipementImg,
    owner: {
      id: "0646f2a3-c87b-4bf2-8b8e-20b343dcaad2",
      name: "Test User",
      email: "testuser5@example.com",
      phone: "1234567890",
    },
  },
  {
    id: "1b6e28c4-5a4f-4fb2-a2bb-a192eac6b898",
    name: "Irrigation Helper 8R Tractor",
    type: "Test",
    hourlyRate: 75.5,
    dailyRate: 600.0,
    location: "Main Farm, Eldoret",
    availability: "AVAILABLE",
    image: equipementImg,

    owner: {
      id: "15592d28-cd1a-4d80-b6a0-71aa8a0f5daa",
      name: "Test User",
      email: "testuser@example.com",
      phone: "1234567890",
    },
  },
];

export default equipmentData;
