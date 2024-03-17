import Image from "next/image";

interface IPage {
  params: {
    id: string;
  };
}

const company = {
  _id: 1,
  name: "Apple",
  website: "https://www.apple.com",
  logo: "https://images.crowdspring.com/blog/wp-content/uploads/2022/08/18131304/apple_logo_black.svg_.png",
  tagline: "Think different",
  email: "info@apple.com",
  industry: "Technology",
  foundedOn: 1976,
  imageOfCEO: "https://example.com/ceo_image.jpg",
  description:
    "Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Five American information technology companies, alongside Amazon, Google, Facebook, and Microsoft. It was founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Jeff Bezos. The company's parent company, Apple Computer, was founded in 1971. It is one of the oldest technology companies in the world. It is one of the oldest companies in the world. It is one of the oldest companies in the world. It is one of the oldest companies in the world. The company's parent company, Apple Computer, was founded in 1971. It is one of the oldest technology companies in the world. It is one of the oldest companies in the world. It is one of the oldest companies in the world. It is one of the oldest companies in the world. ",
  ceo: "Tim Cook",
  revenue: "$274.5 billion (2020)",
  headquaters: "Cupertino, California, United States",
  size: 147000,
  coverPhoto: "https://placehold.co/1500x700?text=cover+photo&font=lato",
};

export default function Page({ params: { id } }: IPage) {
  return <div className="flex flex-col gap-3">
    <div>
        <Image 
        alt="company cover photo"
        fill
        src={company.coverPhoto}
        />
    </div>
  </div>;
}
