const statusButtonColors = {
  applied: "bg-blue-500",
  interview: "bg-green-500",
  shortlisted: "bg-yellow-500",
  rejected: "bg-red-500",
  underReview: "bg-gray-500",
  hired: "bg-cyan-500",
};

const cancelReasons = [
  "Scheduling Conflicts",
  "Job Offer Acceptance",
  "Changed Requirements",
  "Company Changes",
  "Preparation Issues",
  "Location Constraints",
  "Weather Conditions",
  "Unforeseen Circumstances",
  "Communication Problems",
  "Technical Issues",
];

const languageVersions: Record<string, string> = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

const codeSnippets: Record<string, string> = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Carreralink");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Carreralink" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Carreralink")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello Carreralink!");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello Carreralink!");\n\t\t}\n\t}\n}\n',
  php: "<?php\n\n$name = 'Carreralink';\necho $name;\n",
};

export { statusButtonColors, cancelReasons, languageVersions, codeSnippets };
