import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-01-utils/marquee";

import hasanurImg from "@/assets/texti/hasanur.webp";
import sailImg from "@/assets/texti/sail.webp";
import saikatImg from "@/assets/texti/saikat.png";
import sreeImg from "@/assets/texti/sree.jpg";
import mithiImg from "@/assets/texti/mithi.jpg";
import pasanImg from "@/assets/texti/pasan.jpg";
import souImg from "@/assets/texti/sou.jpg";

const reviews = [
  {
    name: "H. Rahaman",
    username: "CEO, NAJ Infotech",
    body: "“Excellent front-end work. Clean UI, smooth experience, and delivered exactly as expected.”",
    profile: hasanurImg,
  },
  {
    name: "S. Ram",
    username: "Senior Developer, SFT",
    body: "“Great attention to detail and solid front-end skills. The implementation was clean and responsive.”",
    profile: sailImg,
  },
  {
    name: "S. Sarkar",
    username: "Senior Graphics Designer",
    body: "“Really impressed with the design implementation. The visuals were translated into a polished, responsive interface.”",
    profile: saikatImg,
  },
  {
    name: "S. Ray",
    username: "CEO, MYT",
    body: "“Professional work from start to finish. The website looks modern, fast, and user-friendly.”",
    profile: sreeImg,
  },
  {
    name: "M. Arya",
    username: "Senior Developer, CC",
    body: "“Strong front-end development skills with clean code and excellent attention to UI details.”",
    profile: mithiImg,
  },
  {
    name: "P. Sam",
    username: "Manager, NYT",
    body: "“Smooth collaboration and quality delivery. The final interface was exactly what we needed.”",
    profile: pasanImg,
  },
  {
    name: "S. Das",
    username: "Senior Graphics Designer, CC",
    body: "“Excellent execution of the design. Clean layouts, responsive screens, and great attention to detail.”",
    profile: souImg,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  profile,
  name,
  username,
  body,
}: {
  profile: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <Card className="relative h-full w-64 cursor-pointer overflow-hidden border-border bg-card shadow-none p-4">
      <CardContent className="p-0 flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <img
            className="rounded-full object-cover"
            width="32"
            height="32"
            alt=""
            src={profile}
          />
          <div className="flex flex-col">
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="text-xs font-medium text-muted-foreground">
              {username}
            </p>
          </div>
        </div>
        <p className="text-sm line-clamp-3 text-foreground">{body}</p>
      </CardContent>
    </Card>
  );
};

export default function TestimonialMarqueeDemo() {
  return (
    <section id="testimonials" className="relative flex w-full flex-col items-center justify-center overflow-hidden py-12">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight clay-headline-multicolor px-4">
          What People Are Saying
        </h2>
      </div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, i) => (
          <ReviewCard key={`${review.username}-${i}`} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, i) => (
          <ReviewCard key={`${review.username}-${i}`} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#f0f9ff] to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#f0f9ff] to-transparent"></div>
    </section>
  );
}
