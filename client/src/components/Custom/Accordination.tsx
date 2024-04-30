import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function LandingPageAccordion() {
  return (
    <div className="flex w-full flex-col gap-8">
      <h1 className="text-center text-3xl font-semibold">
        Frequently Asked Questions
      </h1>
      <Accordion type="single" collapsible className="mx-auto w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Carreralink?</AccordionTrigger>
          <AccordionContent>
            Carreralink is a platform that helps you find jobs. And it
            simplifies the hiring process with in build interview tools.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What is the ai feature?</AccordionTrigger>
          <AccordionContent>
            The ai feature helps you to find the best resume for the job you
            applying. And it gives suggestions for the resume to improve it.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can i add multiple resumes?</AccordionTrigger>
          <AccordionContent>
            Yes. You can add multiple resumes and you can name the resumes. Also
            you can disable the resumes if you want so no one can see it in your
            profile.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
