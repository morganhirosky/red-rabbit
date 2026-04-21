"use client";

import React, { useRef, useState, useEffect } from "react";
import NavBar from "@/components/NavBar";

type MediaBlock = {
  audio: string;
  audioBullets: { text: string; subbullets?: string[] }[];
  mapImage: string;
  mapTitle: string;
  mapCaption: string;
  statText: string;
};

type ImgEntry = { src: string; cropTop?: number };
type ImgAfterValue = ImgEntry | { layout: "side-by-side"; images: ImgEntry[] };

const SECTIONS: Record<string, { title: string; subtitle?: string; image?: string; imagesAfter?: Record<number, ImgAfterValue>; video?: string; videoAfter?: number; subsections?: { title: string; paragraphs: string[]; imagesAfter?: Record<number, ImgAfterValue>; footerLink?: { text: string; href: string }; mediaBlock?: MediaBlock }[]; paragraphs: string[] }[]> = {
  "03": [
    {
      title: "Origin",
      paragraphs: [
        "I have always considered embalming to be closely related to a doctor performing surgery. Both professions witness things most people never will, and both require the ability either to stomach what they feel or to become desensitized enough to return to their own lives afterward — to leave work and attend their child's piano recital that same evening. However, the doctor's patient wakes up (hopefully), and the mortician's client never will. The burden is death itself: while the doctor fights to keep it at bay, the mortician wakes each day to confront it, on call twenty-four hours a day, seven days a week.",
        "My curiosity began a couple of years ago at a graduation party for an old friend. His aunt Sandra was there, and I knew she had been married to a mortician — more than that, she had only recently divorced one. We were sitting together in his backyard when I began asking questions. I think she understood that her experience was, in its own way, fascinating, so she was very open with me.",
        "She told me that her husband had embalmed her father, and that she watched. She looked far away as she said it, though maybe that is something I projected onto her in the moment. I asked how it made her feel, whether it had affected her in any lasting way. She said the grief had already been strange enough that it did not add to the foreignness of what she was feeling, though perhaps, in hindsight, she would not do it again. I do not think I believed the first part.",
        "Since that moment, I have found myself returning to the question of what something like that does to a person — how it truly affected her, and how it affected her husband. Is there a psychology behind it? Did it play any role in their divorce? Naturally, these questions led me to think about morticians more broadly. I wanted to know how the ordinary rhythms of life are altered by such constant proximity to death. Does it change the way they feel when the sun rises each morning? Does that closeness dull the intensity of happy moments, simple pleasures, or even the passing of their own loved ones? Or does it amplify them?",
      ],
    },
    {
      title: "Jimmy",
      subtitle: "The Eighth Grade Boy Wants to See a Dead Body",
      image: "/projects/jimmy.jpg",
      imagesAfter: {
        7:  { layout: "side-by-side", images: [{ src: "/projects/pennington-sign.jpg" }, { src: "/projects/pennington-building.jpg" }] },
        12: { src: "/projects/church.jpg", cropTop: 80 },
      },
      paragraphs: [
        "Mr. Jimmy grew up in New Braunfels, Texas, where he enjoyed his youth with his many friends, and kept busy with extracurricular activities. The city was much smaller compared to its modern size. I began by asking Jimmy when he first realized he had an interest in mortuary science and how he entered the industry.",
        "\"I guess it was in middle school when they [school counselors] approached us in our general business class. They asked us to write a paper on the career or whatever we wanted to go into after high school. I had always been curious about the funeral industry so I wrote my paper on that.\"",
        "Jimmy continues, \"Growing up, I was very close to my grandparents. Starting at a young age, I would hang around adults and tag along when my grandparents went to vigil services. I was always very curious about what went on behind closed doors.\"",
        "\"By that summer, after the eighth grade, I was working in a restaurant and even though I still had an interest, because of my age I really wasn't able to work in a funeral home. But the funeral home got in a bind later that same summer, and wanted to see if I was interested in maybe doing some cleaning and getting the cars ready for the next day. I took on the job, and during the day I'd be at the restaurant then at night, I went in and got the cars ready.\"",
        "Starting the summer after his freshman year of high school, Jimmy assisted the local funeral home with \"removals\", which is when the deceased is transported from the site of death to the mortuary for post-mortem care.",
        "When asked why he wanted to become a mortician he said, \"Well, this is going to sound a little weird but honestly I wanted to see a dead body.\"",
        "Once he graduated college, he went straight to mortuary school at The San Antonio College of Mortuary Science. Jimmy lived in an apartment above the funeral home he began working at while going to school during the day. In 1981, he began his apprenticeship and a year later he passed his state board exam, receiving his license for funeral directing and embalming. After graduation, Jimmy briefly worked in San Antonio before moving back to New Braunfels where he started working on people he had known as he was growing up who had passed away.",
        "Many years later, he returned to San Antonio to work as a manager for a corporate funeral home. The experience led to the realization that he prefers family-owned establishments, such as his current place of work, Pennington Funeral Home. After about two years at the corporate home, Jimmy moved to San Marcos and has been working at Pennington for the last 15 years.",
        "When asked about his least and most favorite parts of his job, he said, \"Well, now that I'm older, it's difficult for me to go out and help pick up a 300-pound individual, especially if they've died on the floor. We actually used to go to the scenes of accidents and pick up bodies off the road or out of a car or from the side of a lake. If there was a drowning, the fire department would pull them out of the water, wrap them up then put them on the side and wait for the funeral home to arrive. That's probably the least.\"",
        "\"What I love the most is when you actually sit in an office with the family and they're telling you exactly how they want the funeral to be, what they want for their loved one while I'm making all my notes and getting all of the information. The best thing you can do for them is just make it happen. I like to carry out all their wishes and meet all their expectations.\"",
        "The candor of his response led to the transition of asking how he maintains balance when navigating a family's grief while also tending to the source of it — his response was really simple.",
        "\"I don't. Funeral directors make a lot of sacrifices. I have missed a lot of things, especially in my only son's life that I regret. Family birthday parties I didn't go to for the sake of a stranger's funeral.\"",
        "I didn't want to allow Jimmy to feel exposed by giving too many moments to sit with his response so I told him I had always assumed they made sacrifices, which was part of what had drawn my curiosity. I circled back to his mention of being raised Catholic, and asked if Catholicism is representative of his religious beliefs as of today.",
        "His answer touched on the technicalities and frustrations involved with multi-hour open caskets before I asked more directly, \"Mr. Jimmy, what do you think happens after we die?\"",
        "He sighed and said, \"From the time we started attending religious classes they would always tell us, it's not really life after death but it is the fact that your soul leaves your body and your soul goes up to Heaven.\"",
        "\"I don't know if there's going to be a time when the Good Lord is going to come down and raise everyone from the dead - okay, so what's gonna happen? You're going to take the bodies, you're going to grow their skin back, and everything else? And then you're going to bring the soul from Heaven? What route will be taken, you know?\"",
        "\"So no, I don't really believe in that besides, yes, the soul does go to Heaven. But once you're gone, that has ended, your life has ended. I think we're told these things only to help you continue to be a good person and be good to each other.\"",
        "\"Even though I came up Catholic and I should believe everything the Catholics have been taught, I really don't look at it that way. I mean, once your life has ended, your shell will start to deteriorate regardless of whether it's in a tomb, in the ground, or cremated. I mean, that's about the extent of it.\"",
        "\"As I've gotten older, I've had some questions - not anything I'd discuss with a priest because a priest will fight you on it. But I have my own way of looking at life and death and, you know, I guess I'll find out one day.\"",
      ],
    },
    {
      title: "Adeline",
      subtitle: "Mortuary's Most Interesting Woman",
      image: "/projects/adeline.jpg",
      video: "/projects/adeline.mov",
      videoAfter: 11,
      paragraphs: [
        "Adeline Bui's story is one of perseverance and determination, forged in the crucible of the American dream. At the age of seven, she immigrated to the United States from Vietnam with her parents. Ruled by tenacity and her will to succeed - an energy she says her father instilled - Bui went on to wholeheartedly pursue five separate business ventures before arriving at her present endeavor: Eternal Peace Funeral Home.",
        "At the height of the COVID-19 pandemic, Adeline's father tragically passed away after suffering from two strokes. Limited by the current state of the world, Adeline was unable to plan a typical funeral for her father. He was an elderly man, as were most of his friends and relatives, meaning it was incredibly unsafe for anyone to travel for a formal gathering especially in the midst of 2020's intense social distancing protocol.",
        "\"My dad was 82 years old when he passed away and all of his friends were about the same,\" Adeline says. \"The last thing I wanted was to have a traditional funeral where all my dad's friends gather during the peak of the pandemic and then fall ill. I couldn't have it on my conscience.\"",
        "Disheartened by circumstance, Adeline's family decided that she, her siblings, and her mother would fulfill her father's after-death requests of cremation and spreading of his ashes in the places he chose.",
        "Their decision to not hold a formal funeral service was out of care for their friends and family's health, as well as a pragmatic decision financially.",
        "\"Prior to being in the funeral business, I had bars,\" Adeline says. \"That was one of the first places the statewide mandate closed. I could not rely on my bar to pay my bills or my staff.\"",
        "When Adeline's father passed, her bar had been closed for months. Adeline's fear that she would be unable to financially support her newly widowed mother led to her and her siblings' necessary prioritization of a sensibly priced cremation because every dollar unspent was a dollar their mother kept.",
        "\"During the time of the 'Stay-at-Home order', my father was in hospice. When he passed away, it was difficult to find a business that was able to do the cremation at all,\" Bui says. \"The mortuary industry was unfortunately booming due to the pandemic.\"",
        "The coronavirus led to many tragic deaths directly, but also indirectly; the sharp influx of patients ill with COVID-19 led to a severe lack of medical resources and space. Many hospitals struggled due to a lack of space - beds were filling quickly and staying full for months on end.",
        "Additionally, hospitals were running low on equipment such as ventilators and respirators that are vital to treating ailments besides COVID-19. The high volume of patients in combination with dwindling supplies caused many people, sick with COVID-19 and other severe illnesses, to go without treatment, or be unable to receive treatment in a timely manner leading mortality rates to spike as a consequence.",
        "\"Luckily, I realized I had a friend that was in the funeral business. I told her I had no idea what to do, which is a common feeling. You really have to rely on the funeral service to lead the way,\" Bui explains. \"I told her we wanted to do a cremation and that it was only going to be the immediate family. No service, no ceremony. She told me what I was wanting is known as a direct cremation.\"",
        "\"I went in to hear the quote for how much a direct cremation would cost and they gave me a quote for $10,000,\" Adeline says. \"We actually started slicing the quote down to $5,000 and she [funeral director] said, 'This is the cheapest package I've ever written,' and I thought to myself, $5,000 is cheap?\"",
        "\"I remember feeling like I was not a good daughter,\" Adeline says. \"Because I was 'nickel and diming' but it wasn't nickel and diming, it was thousands of dollars that I was negotiating for what I don't need.\"",
        "\"But then because of that, how many other families, during one of their darkest moments, have to question ourselves: are we doing the right thing for our loved one? How many other people have to go through this and have to sign a blank check to these funeral homes?\"",
        "\"I started researching and I found that there were a lot of people in my shoes, and only after the fact, they wised up and realized that they have choices.\"",
        "Adeline's frustration from the experience of planning her father's funeral, in combination with the pressure of financial instability brought on by the pandemic, led to the conception of her current aspiration: Eternal Peace Funeral Home.",
        "\"I realized that my dad — his death — kind of pushed me into looking into this [entering the funeral industry],\" Adeline says. \"I vowed to my mom that I would never let a single family feel like the price of their funeral determines how much they love or care for their deceased loved one.\"",
        "It was at this moment that Adeline saw an opportunity to turn her personal tragedy into a way to help others in similar circumstances. She founded Eternal Peace Funeral Services with the goal of providing culturally sensitive and personalized funeral arrangements to families in need.",
        "Eternal Peace Funeral Services works with a variety of ethnic groups and communities to create customized funeral services that honor the wishes of the deceased and their families. Adeline's personal experience has equipped her with the empathy and understanding needed to guide families through the difficult process of saying goodbye to a loved one.",
        "For Adeline, the mission of Eternal Peace Funeral Services is deeply personal, rooted in the belief that every life deserves to be honored with dignity and respect.",
      ],
      subsections: [
        {
          title: "The Foundation",
          paragraphs: [
            "Adeline Bui, owner of Eternal Peace Funeral Home, created a charity foundation to work in unison with her mortuary and funeral services; Bui came up with the concept in 2020, shortly after the formation of her mortuary business, as a result of experiencing a tragedy through the eyes of another.",
            "\"My daughter, who was only 18 at the time, calls me frantic and she tells me that her childhood friend, who also was only 18, was shot and killed in a home invasion while he was in his house all alone,\" Bui says. \"I was shaken to my core.\"",
            "The devastating news about her daughter's childhood best friend left Bui wanting to take action. She learned that the family of the deceased was unable to shoulder the financial burden of the funeral expenses, having never contemplated the possibility of losing their beloved child so soon.",
            "Despite Bui's desire to extend a helping hand to the grieving family with a complimentary funeral service, she was unable to aid with a free service due to her funeral home's paperwork awaiting notarization.",
            "\"I wanted to provide a free service, a free burial, anything I could — but I couldn't because nothing was finalized. I helped them in every way that I knew how, but I still felt so helpless,\" Bui says. \"They were so unprepared, emotionally, of course, but financially, too, which is the last priority but one of the unavoidable burdens.\"",
            "\"That's when I really saw all the ways that parents are unprepared for the death of their child, then it happens and they're torn apart in a million and one ways.\"",
            "Driven by a deep-seated passion to make a difference in the lives of others, Bui founded the Eternal Peace Foundation with a singular mission: to provide assistance to parents who find themselves unable to pay for their child's final farewell.",
            "The Eternal Peace Foundation operates solely on the generosity of the community, relying on donations to fund its noble endeavors. Every application from parents who have recently lost their children and are experiencing financial hardship is carefully considered by the Foundation.",
            "The organization offers aid in the form of financial support to help alleviate the burden of funeral expenses for families grappling with the sudden loss of their child. Every dollar donated to the Eternal Peace Foundation goes directly to those in need, ensuring that each contribution is maximized for its intended purpose.",
          ],
          footerLink: { text: "For more information, visit eternalpeacefuneral.com/foundation ↗", href: "https://www.eternalpeacefuneral.com/foundation" },
          mediaBlock: {
            audio: "/projects/adeline-interview.mov",
            audioBullets: [
              {
                text: "emotional management and personal experience with child bereavement",
                subbullets: [
                  "a seven-year-old's untimely and tragic passing",
                  "a sixteen-year-old's fatal car accident, riding without a seatbelt",
                ],
              },
              {
                text: "Additionally, she discusses:",
                subbullets: [
                  "how her experiences inspire the purpose of the Eternal Peace Foundation",
                  "the most rewarding part of her work: the ability to help others and human connection",
                ],
              },
            ],
            mapImage:   "/projects/car-accidents-texas.png",
            mapTitle:   "Fatal Car Accidents in Texas",
            mapCaption: "Map of the state of Texas, based on Longitude (generated) and Latitude (generated). Color shows total traffic fatalities per 100,000 people. The size illustrates the highest number of fatalities (larger circles).",
            statText:   "According to the Texas Department of Transportation, there were 279 traffic fatalities involving children under 18 in Texas in 2020. Of these, 187 were passenger vehicle occupants, 50 were pedestrians, and 27 were bicyclists. Sadly, the number of child fatalities in Texas increased by 14% from the previous year despite a decrease in overall traffic fatalities. These numbers highlight the importance of educating children and adults on safe driving practices, pedestrian and bicyclist safety, and the use of appropriate child restraint systems in vehicles. It is crucial to promote awareness and implement effective measures to prevent such tragedies from occurring.",
          },
        },
      ],
    },
    {
      title: "Journal",
      subtitle: "the tour: death smells sweet and burns your eyes",
      paragraphs: [],
      subsections: [
        {
          title: "Before the interview",
          imagesAfter: { 3: { src: "/projects/morgan-shed.jpg", cropTop: 160 } },
          paragraphs: [
            "After my hour drive to a relatively pastoral area of north Austin, I arrived at what I assumed to be the wrong place. I had driven into a rural-ish neighborhood about three minutes off I-35, surrounded by autobody shops and strangely spaced single family homes.",
            "I pulled into a fence-lined parking lot that only qualified as a parking lot because it was full of parked cars, otherwise it was truly just a well-kept grass lawn. However, there were almost as many boats as there were vehicles; motor boats, big and small next to sailboats without sails, all sitting on trailers connected to nothing scattered randomly in the grass.",
            "The cluster of cars and boats sat outside of a house. I parked in the lawn, with my back to the abode and searched for any indication that I was actually at a mortuary. I was greeted by the friendly smiles of two older men about fifty paces away, working on one of the beached boats.",
            "I turned to face the house, and noticed a small shed to my left with the name \"Morgan\" on it — my name. I liked the coincidence. Although insignificant, details like this make me feel as if the world really does have a path marked for you. I have a tendency to make something out of nothing, but nonetheless, I was glad I noticed and grateful it was there.",
            "As I started toward the home, I encountered my first indication that I made it to the proper location: a boy, who couldn't have been older than 18 years old, was pushing a gurney with a zipped body bag, holding the shape of a human being because there was most definitely the remnants of a human being inside. He was about to load it into the open trunk of a black Suburban.",
            "I waved awkwardly and said, \"Hi, I'm here to see Ms. Adeline.\"",
            "He said, \"Oh. Okay.\" and left his current task to show me the way.",
            "I followed him up the front porch steps into the house. He disappeared into a room to the right. The layout was relatively open upon entering. There was gray vinyl flooring and gray walls, desks every few feet to my left, and a giant fish tank directly in front of me that looked like it was being used as a room divider.",
            "I looked past the fish tank into a regular kitchen being used as such. To the right of the kitchen, there was a living room area with a matching arm chair and sofa that sandwiched a side table in the corner between them. There was a glass display case that was tall and narrow, holding a military portrait of an older man in a uniform and an American flag folded into a triangle and encased in glass.",
            "Ms. Adeline emerged smiling from the room that the boy had disappeared into; we shook hands and exchanged excited sentiments before she led me into what I'll call the living room. I sat on the couch perpendicular to Ms. Adeline. I asked her if she was okay with our conversation being recorded, she said of course, and then we began.",
          ],
        },
        {
          title: "After the interview",
          paragraphs: [
            "As we exited the house and entered the warehouse, Mrs. Bui paused and asked, \"Do you smell that?\" I couldn't help but notice the sweet floral scent that filled the air. \"Yes, I do,\" I replied. \"It smells very floral, like flowers.\"",
            "Mrs. Bui was pleased with my response and shared an interesting fact. \"That's what everyone says! That's what human death smells like. So interesting that it's so commonly described that way.\"",
            "The warehouse was home to two cremation ovens to the left and roll-out drawer fridges directly in front of the entrance. On the right, a heavy metal door led to a room where Mrs. Bui invited me to observe the embalming process.",
            "As I entered the room, my eyes began to sting and water slightly. I had never seen a cadaver before, and though I was incredibly curious, seeing three at once was a little overwhelming, but certainly not enough to tear up over it. I assured Mrs. Bui that I wasn't crying — she laughed and explained that the formaldehyde used in the embalmment process is an incredibly strong chemical that fills the air.",
            "As the morticians went about their work, kindly explaining the technicalities involved in the embalming process, I felt far from the present — it was hard to look at the bodies but also hard to look away — and the details of their words are hard to recall in hindsight.",
            "Adeline insisted I touch one. I declined and shook my head. She took my hand and grazed my finger against the stubble on the deceased gentleman's left cheek. He was cold to the touch from being kept in the fridge, as were all the others. The bodies had no pink hues in their skin — instead, they appeared somewhat bruised due to being drained of their blood and lack of elasticity from lack of warmth or a pumping heart.",
            "Additionally, they appeared full and stiff due to a combination of the antibacterial chemicals filling their veins and rigor mortis. The room was kept meticulously clean, and the morticians themselves were dressed in attire similar to that of doctors performing surgery.",
            "All in all, my tour of the mortuary provided me with a unique glimpse into the technicalities and legalities involved in after-death care. Though the experience left me feeling a bit jarred, I was grateful for the opportunity to learn more about this important and often overlooked aspect of our society.",
          ],
        },
      ],
    },
    { title: "History", paragraphs: [] },
  ],
};

const PROJECTS = [
  {
    id:       "04",
    type:     "brand & web design",
    format:   "e-commerce",
    year:     "2026",
    title:    "Argo",
    desc:     "Developed original clothing brand from concept through execution, including brand identity, apparel graphics, written copy, and custom e-commerce website with a retro OS aesthetic and hidden artistic subexperiences.",
    equipment:"Adobe Creative Cloud",
    software: "Next.js",
    embed:    null,
    preview:  "/projects/argo-preview.png",
    previewHref: "https://argo-morganhiroskys-projects.vercel.app/",
  },
  {
    id:       "03",
    type:     "independent journalism",
    format:   "photo essay",
    year:     "2023",
    title:    "Life as Death's Keeper",
    desc:     "An examination of morticians' perspectives on mortality, faith, family, and the pursuit of happiness. Long-form interviews and firsthand observation of mortuary practice.",
    equipment:"Canon EOS Rebel SL1 & Digital Rebel XT",
    software: "Adobe Photoshop",
    embed:    null,
  },
  {
    id:       "01",
    type:     "documentary film",
    format:   "trailer",
    year:     "2022",
    title:    "Dead Bugs",
    desc:     "Original documentary trailer exploring identity and self-concept through autobiographical narration as an introduction to complete documentary.",
    equipment:"Canon XF300",
    software: "Adobe Premiere Pro",
    embed:    "https://www.youtube.com/embed/6BiXCjKb1Cc",
  },
  {
    id:       "02",
    type:     "short documentary",
    format:   "full film",
    year:     "2022",
    title:    "Dead Bugs",
    desc:     "Three anonymous individuals share intimate reflections of their self-concepts, memories, and defining relationships. Faceless interviews and sentimentally charged locations suggest that identity emanates beyond the individual.",
    equipment:"Canon XF300",
    software: "Adobe Premiere Pro",
    embed:    "https://www.youtube.com/embed/orgpva2COfY",
  },
] as const;

const SANS  = '"Source Sans 3", "Source Sans Pro", sans-serif';
const SERIF = '"Times New Roman", Times, serif';

export default function Projects() {
  const [selected, setSelected] = useState<number | null>(null);
  const [animKey,  setAnimKey]  = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const rightPaneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const active = selected !== null ? PROJECTS[selected]! : null;

  function selectProject(i: number) {
    setSelected(i);
    setAnimKey(k => k + 1);
  }

  const FULL_TEXT = "select a project";
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (active) return;
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [active]);

  return (
    <main style={{
      width:         "100vw",
      height:        "100vh",
      background:    "#000",
      display:       "flex",
      flexDirection: "column",
      fontFamily:    SANS,
      overflow:      "hidden",
      color:         "#fff",
    }}>

      <NavBar activePath="/projects" />

      {/* ── Content row ── */}
      <div style={{
        flex:     1,
        display:  "flex",
        overflow: "hidden",
      }}>

        {/* ── Left pane: list ── */}
        <div style={{
          width:       isMobile ? "100%" : "300px",
          flexShrink:  0,
          overflowY:   "auto",
          borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.08)",
          display:     isMobile && selected !== null ? "none" : "block",
        }}>
          {PROJECTS.map((p, i) => {
            const isActive = selected === i;
            return (
              <div key={p.id}>
              <div
                onClick={() => selectProject(i)}
                style={{
                  padding:      "16px 32px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background:   isActive ? "rgba(255,255,255,0.05)" : "transparent",
                  cursor:       "default",
                  transition:   "background 0.15s",
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div style={{
                  fontSize:      "11px",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color:         isActive ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.20)",
                  marginBottom:  "6px",
                }}>
                  {p.type} · {p.year}
                </div>
                <div style={{
                  fontSize:        "13px",
                  lineHeight:      1.4,
                  color:           isActive ? "#fff" : "rgba(255,255,255,0.65)",
                  fontWeight:      isActive ? 300 : 200,
                  textTransform:   "lowercase",
                }}>
                  {p.title}
                  {p.format && (
                    <span style={{ color: "rgba(255,255,255,0.30)", fontSize: "11px", marginLeft: "8px" }}>
                      {p.format}
                    </span>
                  )}
                </div>
              </div>

              {/* TOC dropdown for Life as Death's Keeper */}
              {isActive && p.id === "03" && (SECTIONS["03"] ?? []).map((section, si) => (
                <div key={section.title}>
                  <div
                    onClick={() => {
                      const el = rightPaneRef.current?.querySelector(`#section-${si + 1}`);
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    style={{
                      padding:      "10px 32px 10px 44px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      background:   "transparent",
                      cursor:       "default",
                      display:      "flex",
                      alignItems:   "baseline",
                      gap:          "10px",
                      transition:   "background 0.15s",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <span style={{ fontFamily: SANS, fontSize: "9px", color: "rgba(255,255,255,0.20)", letterSpacing: "0.10em" }}>
                      0{si + 1}
                    </span>
                    <span style={{ fontFamily: SERIF, fontSize: "13px", color: "rgba(255,255,255,0.50)" }}>
                      {section.title}
                    </span>
                  </div>
                  {section.subsections?.map((sub, ki) => (
                    <div
                      key={sub.title}
                      onClick={() => {
                        const el = rightPaneRef.current?.querySelector(`#section-${si + 1}-sub-${ki}`);
                        el?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      style={{
                        padding:      "8px 32px 8px 60px",
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                        background:   "transparent",
                        cursor:       "default",
                        display:      "flex",
                        alignItems:   "baseline",
                        gap:          "10px",
                        transition:   "background 0.15s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <span style={{ fontFamily: SANS, fontSize: "8px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.10em" }}>↳</span>
                      <span style={{ fontFamily: SERIF, fontSize: "12px", color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>
                        {sub.title}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
              </div>
            );
          })}
        </div>

        {/* ── Right pane: detail ── */}
        <div ref={rightPaneRef} style={{
          flex:          1,
          overflowY:     "auto",
          padding:       "48px 32px",
          display:       isMobile && selected === null ? "none" : "flex",
          flexDirection: "column",
          alignItems:    "center",
          textAlign:     "center",
          gap:           "0",
        }}>
          {isMobile && selected !== null && (
            <button
              onClick={() => setSelected(null)}
              style={{
                alignSelf:     "flex-start",
                fontFamily:    SANS,
                fontSize:      "11px",
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color:         "rgba(255,255,255,0.40)",
                background:    "none",
                border:        "none",
                cursor:        "default",
                marginBottom:  "24px",
                padding:       0,
              }}
            >
              ← back
            </button>
          )}

{!active ? (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: SANS, fontSize: "clamp(24px, 2.5vw, 40px)", fontWeight: "normal", color: "rgba(255,255,255,0.45)" }}>
                {typed}
              </span>
              <span style={{ fontFamily: SANS, fontSize: "clamp(24px, 2.5vw, 40px)", color: "rgba(255,255,255,0.45)", animation: "blink-p 1s step-start infinite", marginLeft: "2px" }}>|</span>
            </div>
          ) : (
            <div key={animKey} style={{
              position:      "relative",
              width:         "100%",
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              animation:     "scan-reveal 0.6s ease-out forwards",
            }}>
              {/* scan line glow */}
              <div style={{
                position:   "absolute",
                left:       0, right: 0,
                height:     "60px",
                background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)",
                animation:  "scan-line 0.6s ease-out forwards",
                pointerEvents: "none",
                zIndex:     10,
              }} />
<>

          {/* ── Project header card ── */}
          <div style={{
            width:        (active.embed || ("preview" in active && active.preview)) ? "100%" : "fit-content",
            border:       "1px solid rgba(255,255,255,0.10)",
            borderRadius: "4px",
            background:   "rgba(255,255,255,0.02)",
            padding:      "32px 40px",
            marginBottom: "40px",
            display:      "flex",
            flexDirection: (active.embed || ("preview" in active && active.preview)) ? "row" : "column",
            alignItems:   (active.embed || ("preview" in active && active.preview)) ? "flex-start" : "center",
            gap:          (active.embed || ("preview" in active && active.preview)) ? "40px" : "0",
          }}>

            {/* Left: text info */}
            <div style={{
              display:       "flex",
              flexDirection: "column",
              alignItems:    (active.embed || ("preview" in active && active.preview)) ? "flex-start" : "center",
              flex:          (active.embed || ("preview" in active && active.preview)) ? "0 0 auto" : undefined,
              maxWidth:      (active.embed || ("preview" in active && active.preview)) ? "280px" : undefined,
            }}>
              <div style={{
                fontSize:      "10px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color:         "rgba(255,255,255,0.30)",
                marginBottom:  "16px",
              }}>
                {active.type} · {active.year}
              </div>

              <h1 style={{
                fontFamily:   SERIF,
                fontSize:        "clamp(20px, 2vw, 32px)",
                fontWeight:      "normal",
                lineHeight:      1.05,
                color:           "#fff",
                marginBottom:    "6px",
                textAlign:       (active.embed || ("preview" in active && active.preview)) ? "left" : "center",
                textTransform:   "lowercase",
              }}>
                {active.title}
              </h1>

              <div style={{
                fontSize:      "12px",
                letterSpacing: "0.06em",
                color:         "rgba(255,255,255,0.25)",
                marginBottom:  "12px",
                fontStyle:     "italic",
              }}>
                {active.format}
              </div>

              <div style={{
                width:        "40px",
                height:       "1px",
                background:   "rgba(255,255,255,0.15)",
                marginBottom: "12px",
              }} />

              <p style={{
                fontFamily:  SERIF,
                fontWeight:  200,
                fontSize:    "15px",
                lineHeight:  1.85,
                color:       "rgba(255,255,255,0.65)",
                marginBottom:"24px",
                textAlign:   (active.embed || ("preview" in active && active.preview)) ? "left" : "center",
                maxWidth:    (active.embed || ("preview" in active && active.preview)) ? undefined : "520px",
              }}>
                {active.desc}
              </p>

              <div style={{ display: "flex", gap: "40px" }}>
                <div>
                  <div style={{
                    fontSize:      "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color:         "rgba(255,255,255,0.20)",
                    marginBottom:  "6px",
                  }}>
                    equipment
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.50)" }}>
                    {active.equipment}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize:      "9px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color:         "rgba(255,255,255,0.20)",
                    marginBottom:  "6px",
                  }}>
                    software
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.50)" }}>
                    {active.software}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: video embed */}
            {active.embed && (
              <div style={{
                flex:        1,
                aspectRatio: "16 / 9",
                overflow:    "hidden",
                border:      "1px solid rgba(255,255,255,0.10)",
                borderRadius:"2px",
                background:  "#111",
                minWidth:    0,
              }}>
                <iframe
                  key={active.embed}
                  src={active.embed}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                />
              </div>
            )}

            {/* Right: preview image link */}
            {"preview" in active && active.preview && (
              <a
                href={"previewHref" in active ? active.previewHref : undefined}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex:        1,
                  display:     "block",
                  overflow:    "hidden",
                  border:      "1px solid rgba(255,255,255,0.10)",
                  borderRadius:"2px",
                  minWidth:    0,
                  cursor:      "default",
                  position:    "relative",
                }}
                onMouseEnter={e => {
                  const label = e.currentTarget.querySelector(".preview-label") as HTMLElement;
                  if (label) label.style.opacity = "1";
                }}
                onMouseLeave={e => {
                  const label = e.currentTarget.querySelector(".preview-label") as HTMLElement;
                  if (label) label.style.opacity = "0";
                }}
              >
                <img
                  src={active.preview}
                  alt={active.title}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <div className="preview-label" style={{
                  position:      "absolute",
                  bottom:        "12px",
                  right:         "14px",
                  fontFamily:    SANS,
                  fontSize:      "11px",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color:         "#fff",
                  background:    "rgba(0,0,0,0.55)",
                  padding:       "4px 10px",
                  borderRadius:  "2px",
                  opacity:       0,
                  transition:    "opacity 0.2s",
                  pointerEvents: "none",
                }}>
                  visit site ↗
                </div>
              </a>
            )}

          </div>

          {/* Section content — Life as Death's Keeper only */}
          {active.id === "03" && (
            <>

              {/* Section content */}
              {(SECTIONS["03"] ?? []).map((section, i) => (
                <React.Fragment key={section.title}>
                  {i > 0 && (
                    <div style={{
                      width:        "100%",
                      maxWidth:     "680px",
                      height:       "4px",
                      background:   "rgba(255,255,255,0.75)",
                      marginBottom: "40px",
                      marginTop:    "0px",
                      flexShrink:   0,
                    }} />
                  )}
                <div
                  id={`section-${i + 1}`}
                  style={{
                    width:        "100%",
                    maxWidth:     "680px",
                    marginBottom: "24px",
                    scrollMarginTop: "32px",
                  }}
                >
                  <div style={{
                    display:      "flex",
                    alignItems:   "baseline",
                    gap:          "12px",
                    marginBottom: "24px",
                    justifyContent: "center",
                  }}>
                    <span style={{ fontFamily: SANS, fontSize: "10px", color: "rgba(255,255,255,0.20)", letterSpacing: "0.10em" }}>
                      0{i + 1}
                    </span>
                    <h2 style={{ fontFamily: SERIF, fontSize: "22px", fontWeight: "normal", color: "#fff", margin: 0 }}>
                      {section.title}
                    </h2>
                  </div>

                  {section.subtitle && (
                    <p style={{
                      fontFamily:   SERIF,
                      fontSize:     "15px",
                      fontStyle:    "italic",
                      color:        "rgba(255,255,255,0.45)",
                      textAlign:    "center",
                      marginBottom: "28px",
                    }}>
                      {section.subtitle}
                    </p>
                  )}

                  {section.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={section.image}
                      alt={section.title}
                      style={{
                        float:        "right",
                        width:        "200px",
                        marginLeft:   "24px",
                        marginBottom: "12px",
                        marginTop:    "5px",
                        display:      "block",
                        filter:       "grayscale(30%)",
                        borderRadius: "2px",
                        boxShadow:    "0 4px 24px rgba(0,0,0,0.6)",
                      }}
                    />
                  )}

                  {section.paragraphs.length > 0 ? (
                    <>
                      {section.paragraphs.map((p, j) => (
                        <React.Fragment key={j}>
                          <p style={{
                            fontFamily:   SERIF,
                            fontWeight:   "normal",
                            fontSize:     "14px",
                            lineHeight:   1.9,
                            color:        "rgba(255,255,255,0.70)",
                            marginBottom: "16px",
                            textAlign:    "justify",
                          }}>
                            {p}
                          </p>
                          {section.imagesAfter?.[j] && (() => {
                            const entry = section.imagesAfter![j];
                            if ("layout" in entry && entry.layout === "side-by-side") {
                              return (
                                <div style={{ display: "flex", gap: "8px", marginBottom: "24px", clear: "both", alignItems: "stretch" }}>
                                  {entry.images.map((img, ii) => {
                                    const isAnchor = ii === entry.images.length - 1;
                                    return (
                                      <div key={ii} style={{ flex: 1, overflow: "hidden", borderRadius: "2px", boxShadow: "0 4px 24px rgba(0,0,0,0.5)", position: "relative" }}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={img.src} alt="" style={isAnchor
                                          ? { width: "100%", display: "block" }
                                          : { position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "bottom" }
                                        } />
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            }
                            const crop = (entry as ImgEntry).cropTop ?? 0;
                            return (
                              <div style={{ overflow: "hidden", marginBottom: "24px", borderRadius: "2px", boxShadow: "0 4px 24px rgba(0,0,0,0.5)", clear: "both" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={(entry as ImgEntry).src} alt="" style={{ width: "100%", display: "block", marginTop: `-${crop}px` }} />
                              </div>
                            );
                          })()}
                          {section.video && section.videoAfter === j && (
                            <>
                              <div style={{ clear: "both" }} />
                              <video
                                key="section-video"
                                src={section.video}
                                controls
                                style={{
                                  width:        "100%",
                                  display:      "block",
                                  marginTop:    "8px",
                                  marginBottom: "32px",
                                  borderRadius: "2px",
                                }}
                              />
                            </>
                          )}
                        </React.Fragment>
                      ))}
                      <div style={{ clear: "both" }} />
                    </>
                  ) : !section.subsections?.length ? (
                    <p style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(255,255,255,0.15)", textAlign: "center" }}>
                      coming soon
                    </p>
                  ) : null}

                  {/* Subsections */}
                  {section.subsections?.map((sub, ki) => (
                    <div
                      key={sub.title}
                      id={`section-${i + 1}-sub-${ki}`}
                      style={{
                        width:           "100%",
                        marginTop:       "48px",
                        scrollMarginTop: "32px",
                      }}
                    >
                      <div style={{
                        display:        "flex",
                        alignItems:     "baseline",
                        gap:            "12px",
                        marginBottom:   "24px",
                        justifyContent: "center",
                      }}>
                        <h3 style={{ fontFamily: SERIF, fontSize: "18px", fontWeight: "normal", color: "rgba(255,255,255,0.75)", margin: 0, fontStyle: "italic" }}>
                          {sub.title}
                        </h3>
                      </div>
                      {sub.paragraphs.length > 0 ? (
                        sub.paragraphs.map((p, j) => (
                          <React.Fragment key={j}>
                            <p style={{
                              fontFamily:   SERIF,
                              fontWeight:   "normal",
                              fontSize:     "14px",
                              lineHeight:   1.9,
                              color:        "rgba(255,255,255,0.70)",
                              marginBottom: "16px",
                              textAlign:    "justify",
                            }}>
                              {p}
                            </p>
                            {sub.imagesAfter?.[j] && (() => {
                              const imgData = sub.imagesAfter![j];
                              if (!imgData || 'layout' in imgData) return null;
                              const crop = imgData.cropTop ?? 0;
                              return (
                                <div style={{ overflow: "hidden", marginBottom: "24px", borderRadius: "2px", boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={imgData.src}
                                    alt=""
                                    style={{
                                      width:     "100%",
                                      display:   "block",
                                      marginTop: `-${crop}px`,
                                    }}
                                  />
                                </div>
                              );
                            })()}
                          </React.Fragment>
                        ))
                      ) : (
                        <p style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(255,255,255,0.15)", textAlign: "center" }}>
                          coming soon
                        </p>
                      )}
                      {sub.mediaBlock && (
                        <div style={{ width: "100%", marginTop: "48px" }}>

                          {/* Audio section — card */}
                          <div style={{
                            border:       "1px solid rgba(255,255,255,0.10)",
                            borderRadius: "4px",
                            background:   "rgba(255,255,255,0.02)",
                            padding:      "28px 28px 24px",
                            marginBottom: "24px",
                          }}>
                            <p style={{ fontFamily: SERIF, fontSize: "15px", fontWeight: "normal", color: "#fff", marginBottom: "12px", lineHeight: 1.6, textAlign: "center" }}>
                              Click play to listen to an additional snippet from Adeline Bui's interview.
                            </p>
                            <audio
                              controls
                              src={sub.mediaBlock.audio}
                              style={{ width: "100%", marginBottom: "16px" }}
                            />
                            <p style={{ fontFamily: SERIF, fontSize: "15px", fontWeight: "normal", color: "rgba(255,255,255,0.50)", marginBottom: "12px", lineHeight: 1.6, textAlign: "left" }}>
                              In this clip she details her experience with:
                            </p>
                            <ul style={{ paddingLeft: "20px", margin: 0 }}>
                              {sub.mediaBlock.audioBullets.map((b, bi) => (
                                <li key={bi} style={{ fontFamily: SERIF, fontSize: "14px", fontWeight: "normal", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: "4px", textAlign: "left" }}>
                                  {b.text}
                                  {b.subbullets && (
                                    <ul style={{ paddingLeft: "16px", marginTop: "4px" }}>
                                      {b.subbullets.map((s, si) => (
                                        <li key={si} style={{ fontFamily: SERIF, fontSize: "13px", color: "rgba(255,255,255,0.30)", lineHeight: 1.8 }}>
                                          {s}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Did you know — card */}
                          <div style={{
                            border:       "1px solid rgba(255,255,255,0.10)",
                            borderRadius: "4px",
                            background:   "rgba(255,255,255,0.02)",
                            padding:      "28px 28px 24px",
                          }}>
                            <p style={{ fontFamily: SERIF, fontSize: "15px", fontStyle: "italic", color: "rgba(255,255,255,0.35)", marginBottom: "20px", letterSpacing: "0.04em", textAlign: "left" }}>
                              side note: did you know?
                            </p>

                            {/* Map title above flex row */}
                            <p style={{ fontFamily: SERIF, fontSize: "10px", fontWeight: "normal", color: "rgba(255,255,255,0.30)", marginBottom: "8px", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "left" }}>
                              {sub.mediaBlock.mapTitle}
                            </p>

                            <div style={{ display: "flex", gap: "28px", alignItems: "stretch" }}>
                              {/* Map image + caption */}
                              <div style={{ flex: "0 0 65%", display: "flex", flexDirection: "column" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={sub.mediaBlock.mapImage}
                                  alt={sub.mediaBlock.mapTitle}
                                  style={{ width: "100%", display: "block", borderRadius: "2px", filter: "grayscale(15%) brightness(0.85)" }}
                                />
                                <p style={{ fontFamily: SERIF, fontSize: "9px", color: "rgba(255,255,255,0.20)", lineHeight: 1.5, marginTop: "6px", textAlign: "center" }}>
                                  {sub.mediaBlock.mapCaption}
                                </p>
                              </div>

                              {/* Stat text — aligned top with image, bottom with caption */}
                              <div style={{ flex: 1, overflow: "hidden" }}>
                                <p style={{
                                  fontFamily: SERIF,
                                  fontSize:   "10px",
                                  fontWeight: "normal",
                                  color:      "rgba(255,255,255,0.50)",
                                  lineHeight: 1.7,
                                  textAlign:  "left",
                                  height:     "100%",
                                  overflow:   "hidden",
                                }}>
                                  {sub.mediaBlock.statText}
                                </p>
                              </div>
                            </div>
                          </div>

                        </div>
                      )}

                      {sub.footerLink && (
                        <a
                          href={sub.footerLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display:       "inline-block",
                            marginTop:     "8px",
                            fontFamily:    SANS,
                            fontSize:      "11px",
                            letterSpacing: "0.08em",
                            color:         "rgba(255,255,255,0.45)",
                            textDecoration:"none",
                            borderBottom:  "1px solid rgba(255,255,255,0.20)",
                            paddingBottom: "2px",
                            transition:    "color 0.2s, border-color 0.2s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#fff"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)"; }}
                        >
                          {sub.footerLink.text}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                </React.Fragment>
              ))}
            </>
          )}

            </>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
