import "./DialogPage.css";

export function DialogPage({ info, setInfo }) {
  const titles = {
    about: "About Fastidiouscity",
    disclaimer: "Disclaimer from the creators",
  };

  const texts = {
    about: [
      "Fastidiouscity was created in 2020 by Stefano Agresti and Prof. Mark James Carman as part of Stefano Agresti's Master's Degree Thesis \"Automated Techniques for Identifying Fake News and Assisting Fact Checkers\".",
      "During their participation in the CheckThat! 2022 challenge (part of the CLEF 2022 conference), the project was redesigned and rebuilt, this time using GPT-3 as main engine.",
      "The aim of the project is to assist journalists and fact-checkers in their job, using AI to quickly analyze texts and speeches, gathering evidence to support or counter any controversial claim.",
      "If you’re interested in the project, we would like to hear from you! ",
    ],
    disclaimer: [
      "The aim of this website is to support journalists in their activity of searching for evidence when fact checking claims made by politicians and other public figures.",
      "No reliability is intended with respect to the accuracy of the system (in terms of the claims detected in text, the evidence provided, the characterisation of the sources in terms of their bias, etc.) and thus it is not intended to be used directly by non-journalists as a fact checking system.",
      "Moreover, since the content provided on this site (including the opinions regarding the veracity of claims made or the support or refutation of said claims) is generated automatically by an Artificial Intelligence model, it does not necessarily agree with,  nor represent the opinions of, the creators of the website.",
    ],
  };

  const contacts = ["stefano.agresti19@gmail.com", "mark.carman@polimi.it "];

  return (
    <div className={"external-cover" + (info === null ? " invisible" : "")}>
      <div className="internal-container">
        <h3 className="close-dialog" onMouseUp={() => setInfo(null)}>
          X
        </h3>
        <h1>{titles[info]}</h1>
        {texts[info]?.map((text, i) => (
          <p className="textInfo" key={i}>
            {text}
          </p>
        ))}
        <div style={{ display: info === "about" ? "" : "none", width: "100%" }}>
          <p style={{ textAlign: "right" }}>You can contact the creators at:</p>
          {contacts.map((contact, i) => (
            <p style={{ textAlign: "right" }} className="textInfo" key={i}>
              <a href={"mailto:" + contact}>{contact}</a>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
