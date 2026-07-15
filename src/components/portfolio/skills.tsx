// "use client";

// import type { IconType } from "react-icons";
// import {
//   SiReact,
//   SiNextdotjs,
//   SiTypescript,
//   SiRedux,
//   SiTailwindcss,
//   SiNodedotjs,
//   SiExpress,
//   SiGraphql,
//   SiJsonwebtokens,
//   SiPostgresql,
//   SiMongodb,
//   SiPrisma,
//   SiDocker,
//   SiGit,
// } from "react-icons/si";
// import { motion } from "framer-motion";
// import { SKILL_GROUPS } from "@/lib/data";
// import { Reveal } from "./reveal";

// const ICONS: Record<string, IconType> = {
//   react: SiReact,
//   nextjs: SiNextdotjs,
//   typescript: SiTypescript,
//   redux: SiRedux,
//   tailwind: SiTailwindcss,
//   node: SiNodedotjs,
//   express: SiExpress,
//   graphql: SiGraphql,
//   auth: SiJsonwebtokens,
//   postgresql: SiPostgresql,
//   mongodb: SiMongodb,
//   prisma: SiPrisma,
//   docker: SiDocker,
//   git: SiGit,
// };

// export function Skills() {
//   return (
//     <section id="skills" className="relative bg-(--ink) py-24 sm:py-32">
//       {/* faint dotted separator */}
//       <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-(--line)" />

//       <div className="mx-auto max-w-6xl px-6">
//         <Reveal>
//           <div className="flex items-center gap-3 font-mono text-xs text-(--amber)">
//             <span className="h-px w-8 bg-(--amber)" />
//             skills.schema
//           </div>
//         </Reveal>
//         <Reveal delay={0.06}>
//           <h2 className="mt-6 max-w-xl font-(family-name:--font-display) text-3xl font-medium leading-tight text-(--paper) sm:text-4xl">
//             One stack, three layers, zero guesswork.
//           </h2>
//         </Reveal>

//         <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
//           {SKILL_GROUPS.map((group, gi) => (
//             <Reveal key={group.title} delay={0.1 + gi * 0.08}>
//               <div className="h-full rounded-2xl border border-(--line) bg-(--ink-2)/50 p-6 transition-colors hover:border-(--amber)/30">
//                 <div className="flex items-baseline justify-between">
//                   <h3 className="font-(family-name:--font-display) text-lg text-(--paper)">
//                     {group.title}
//                   </h3>
//                   <span className="font-mono text-[11px] text-muted">
//                     0{gi + 1}
//                   </span>
//                 </div>
//                 <p className="mt-1.5 text-[13px] text-muted">
//                   {group.description}
//                 </p>

//                 <ul className="mt-6 space-y-5">
//                   {group.items.map((item, ii) => {
//                     const Icon = ICONS[item.icon];
//                     return (
//                       <li key={item.name}>
//                         <div className="flex items-center justify-between text-sm">
//                           <span className="flex items-center gap-2 text-(--paper)">
//                             {Icon && (
//                               <Icon size={15} className="text-(--teal)" />
//                             )}
//                             {item.name}
//                           </span>
//                           <span className="font-mono text-[11px] text-muted">
//                             {item.level}%
//                           </span>
//                         </div>
//                         <div className="mt-2 h-1 overflow-hidden rounded-full bg-(--line)">
//                           <motion.div
//                             className="h-full origin-left rounded-full bg-linear-to-r from-(--amber) to-(--teal)"
//                             style={{ width: `${item.level}%` }}
//                             initial={{ scaleX: 0 }}
//                             whileInView={{ scaleX: 1 }}
//                             viewport={{ once: true, margin: "-40px" }}
//                             transition={{
//                               duration: 0.8,
//                               delay: 0.1 + gi * 0.08 + ii * 0.05,
//                               ease: [0.16, 1, 0.3, 1],
//                             }}
//                           />
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiJsonwebtokens,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { SKILL_GROUPS } from "@/lib/portfolio/data";
import { Reveal } from "./reveal";

const ICONS: Record<string, IconType> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  redux: SiRedux,
  tailwind: SiTailwindcss,
  node: SiNodedotjs,
  express: SiExpress,
  graphql: SiGraphql,
  auth: SiJsonwebtokens,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  prisma: SiPrisma,
  docker: SiDocker,
  git: SiGit,
};

export function Skills() {
  return (
    <section id="skills" className="relative bg-(--ink) py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-(--line)" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs text-(--amber)">
            <span className="h-px w-8 bg-(--amber)" />
            skills.schema
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 max-w-xl font-(family-name:--font-display) text-3xl font-medium leading-tight text-(--paper) sm:text-4xl">
            One stack, three layers, zero guesswork.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((group, gi) => (
            <Reveal key={group.title} delay={0.1 + gi * 0.08}>
              <div className="h-full rounded-2xl border border-(--line) bg-(--ink-2)/50 p-6 transition-colors hover:border-(--amber)/30">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-(family-name:--font-display) text-lg text-(--paper)">
                    {group.title}
                  </h3>
                  <span className="font-mono text-[11px] text-muted">
                    0{gi + 1}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] text-muted">
                  {group.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {group.items.map((item, ii) => {
                    const Icon = ICONS[item.icon];
                    return (
                      <Reveal
                        key={item.name}
                        delay={0.16 + gi * 0.08 + ii * 0.04}
                      >
                        <span className="group flex items-center gap-2 rounded-lg border border-(--line) bg-(--ink) px-3 py-2 text-sm text-(--paper) transition-all hover:-translate-y-0.5 hover:border-(--amber)/40 hover:text-(--amber)">
                          {Icon && (
                            <Icon
                              size={15}
                              className="text-(--teal) transition-colors group-hover:text-(--amber)"
                            />
                          )}
                          {item.name}
                        </span>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
