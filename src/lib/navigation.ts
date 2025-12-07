import { defineNavigation } from "@svecodocs/kit";
import ChalkboardTeacher from "phosphor-svelte/lib/ChalkboardTeacher";
import RocketLaunch from "phosphor-svelte/lib/RocketLaunch";
import Tag from "phosphor-svelte/lib/Tag";
import { getAllDocs } from "./utils.js";

const allDocs = getAllDocs();

// const components = allDocs
//   .filter((doc) => doc.section === "Components")
//   .map((doc) => ({
//     title: doc.title,
//     href: `/${doc.slug}`,
//   }));

// const configuration = allDocs
//   .filter((doc) => doc.section === "Configuration")
//   .map((doc) => ({
//     title: doc.title,
//     href: `/${doc.slug}`,
//   }));

// const svelteSimpleFormDocs = allDocs
//   .filter((doc) => doc.section === "Svelte Simple Form")
//   .map((doc) => ({
//     title: doc.title,
//     href: `/${doc.slug}`,
//   }));
//   .reverse();

// const svelteSimpleQueryDocs = allDocs
//   .filter((doc) => doc.section === "Svelte Simple Query")
//   .map((doc) => ({
//     title: doc.title,
//     href: `/${doc.slug}`,
//   }))
//   .reverse();

// const svelteSimpleLangDocs = allDocs
//   .filter((doc) => doc.section === "Svelte Simple Lang")
//   .map((doc) => ({
//     title: doc.title,
//     href: `/${doc.slug}`,
//   }))
//   .reverse();

export const navigation = defineNavigation({
  anchors: [
    {
      title: "Welcome",
      href: "/",
      icon: ChalkboardTeacher,
    },
    // {
    //   title: "Getting Started",
    //   href: "/getting-started",
    //   icon: RocketLaunch,
    // },
    // {
    // 	title: "Releases",
    // 	href: "https://github.com/svecosystem/svecodocs/releases",
    // 	icon: Tag,
    // },
  ],
  sections: [
    {
      title: "Svelte Simple Form",
      items: [
        {
          title: "Introduction",
          href: "/svelte-simple-form/introduction",
        },
        // {
        //   title: "Installation",
        //   href: "/svelte-simple-form/installation",
        // },
        {
          title: "Usage",
          href: "/svelte-simple-form/usage",
        },
        {
          title: "Validation",
          href: "/svelte-simple-form/validation",
        },
        {
          title: "Form actions",
          href: "/svelte-simple-form/form-actions",
        },
        {
          title: "Examples - WIP",
          href: "/svelte-simple-form/examples",
        },
        {
          title: "Releases",
          href: "/svelte-simple-form/releases",
        },
        {
          title: "Releases 0.3.1 (Latest)",
          href: "/svelte-simple-form/release-0.3.1",
        },
      ],
    },
    {
      title: "Svelte Simple Query",
      items: [
        {
          title: "WIP",
        },
      ],
    },
    {
      title: "Svelte Simple Lang",
      items: [
        {
          title: "WIP",
        },
      ],
    },
  ],
});
