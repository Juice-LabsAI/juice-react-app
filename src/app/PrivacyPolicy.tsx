import LegalLayout from "./components/LegalLayout";

/**
 * Privacy Policy — ported from the Juice Webflow site (juice-staging.webflow.io/
 * privacy-policy). Legal wording is preserved; mechanical source artefacts were
 * repaired: missing spaces from line-wrapping, a garbled "Log data" bullet
 * (§5.4), a duplicated audience-segments bullet (§5.5), swapped headings for
 * "Business transfers"/"Legal and regulatory disclosures" (§9), and a
 * "Changes"-paragraph that was misplaced in §15 and triplicated in §16.
 */
export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="4th Jan 2025">
      <h2>1. Introduction</h2>
      <p>
        This Privacy Policy explains how <strong>Juicelabs AI Private Limited</strong> (“Company”, “we”,
        “us”, or “our”) collects, uses, discloses and protects information in connection with your use of our
        websites, applications, platforms, AI tools and related services (collectively, the “Services”).
      </p>
      <p>
        We are a company incorporated in India and are committed to handling personal information in accordance
        with applicable data protection laws in India and, where relevant, other jurisdictions in which our
        users are located.
      </p>
      <p>
        This Privacy Policy describes our general practices as of the “Last updated” date above. It is not a
        guarantee or contract that we will process personal information in a particular way; our practices may
        evolve as our Services and legal requirements change, as described in this Policy.
      </p>
      <p>
        By accessing or using the Services, you agree to the terms of this Privacy Policy. If you do not agree,
        please do not use the Services.
      </p>

      <h2>2. Who we are and how to contact us</h2>
      <p>
        <strong>Grievance Officer / Data Protection Contact:</strong>
        <br />
        <a href="mailto:support@juicelabs.ai">support@juicelabs.ai</a>
      </p>
      <p>
        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us
        using the details above.
      </p>

      <h2>3. Scope of this Privacy Policy</h2>
      <p>This Privacy Policy applies to:</p>
      <ul>
        <li>Visitors to our websites and marketing pages</li>
        <li>Users who create accounts or use the platform (including trial users)</li>
        <li>Workspace members invited by an organisation</li>
        <li>Customers, partners and prospects who interact with us for sales, support or marketing</li>
      </ul>
      <p>
        This Privacy Policy does <strong>not</strong> apply to:
      </p>
      <ul>
        <li>Third-party websites, apps or services that link to or from our Services</li>
        <li>
          Data that we process solely as a processor on your instructions under a separate agreement and/or Data
          Processing Addendum (for example, certain end-customer datasets you connect or upload for analysis)
        </li>
      </ul>
      <p>
        Where we act as a processor on your instructions, your organisation is responsible for ensuring that the
        processing is lawful and for providing any required notices and consents.
      </p>

      <h2>4. Key concepts used in this Policy</h2>
      <ul>
        <li>
          <strong>“Inputs”</strong>: prompts, briefs, assets, data or other content you or your authorised users
          provide to the Services.
        </li>
        <li>
          <strong>“Generated Content”</strong>: any and all content, outputs, data, materials, or intellectual
          property generated, created, or produced by the AI tools as a result of your use of the Services,
          including, but not limited to, deliverables, reports, documents, images, text, or other digital assets.
          Generated Content has two main parts:
          <ul>
            <li>
              <strong>“Creative Outputs”</strong>: production-ready deliverables created and supplied by us,
              including (i) scripts (final copy/VO/subtitles); (ii) images (final stills, artwork, layered
              production files); and (iii) video (final edits, project files, renders, and cut-downs).
            </li>
            <li>
              <strong>“Creative Strategies”</strong>: non-production materials such as ideas, themes, mood boards,
              prompts, frameworks, routes, treatments, strategy decks, and concept notes. Creative Strategies are
              for ideation only and are not Creative Outputs.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        As used in this Privacy Policy, “personal information” or “personal data” generally means information
        that identifies or can reasonably be used to identify a natural person.
      </p>

      <h2>5. Information we collect</h2>
      <p>We collect the following categories of information, depending on how you interact with us:</p>
      <h3>5.1 Account and contact information</h3>
      <ul>
        <li>Name and contact details (such as email address, phone number)</li>
        <li>Company name, job title, role, department or team</li>
        <li>Workspace, brand and project associations (e.g., which brands you work on)</li>
        <li>Authentication details such as passwords or SSO identifiers</li>
      </ul>
      <h3>5.2 Billing and transaction information</h3>
      <ul>
        <li>Billing contact and postal address</li>
        <li>Tax or registration details (such as GSTIN, VAT number, other registration IDs)</li>
        <li>Subscription plan details, invoices, payment status</li>
        <li>
          Partial payment card information (e.g., last 4 digits, expiry month/year) processed via our payment
          partners
        </li>
      </ul>
      <p>
        We do not store full payment card details on our own systems. These are handled by secure, compliant
        payment processors.
      </p>
      <h3>5.3 Workspace, brand and creative data</h3>
      <p>To provide the Services, we process the content you upload, connect, or create, including:</p>
      <ul>
        <li>Briefs, insights, audience definitions, strategic documents</li>
        <li>Brand playbooks, guidelines, tone-of-voice documents, positioning and territories</li>
        <li>Creative assets and content (text, scripts, storyboards, images, videos and related files)</li>
        <li>Generated Content, including Creative Outputs and Creative Strategies</li>
        <li>Feedback, ratings, comments, tags, and other metadata you apply to content</li>
        <li>Structures such as projects, campaigns, brands, sub-brands and workspaces</li>
      </ul>
      <p>
        This may include information about individuals (for example, if such information appears in your briefs
        or creative assets). <strong>You are responsible for ensuring that you have a lawful basis and all
        necessary rights to upload, share or otherwise process such personal information through the Services,
        and for providing any required notices to and obtaining any required consents from the individuals
        concerned.</strong>
      </p>
      <h3>5.4 Usage, device and technical data</h3>
      <p>
        When you use the Services, we automatically collect certain technical and usage information, such as:
      </p>
      <ul>
        <li>IP address, approximate location (city/country)</li>
        <li>Device and browser information (type, version, operating system)</li>
        <li>Log data (timestamps, pages viewed, features used, referring/exit URLs)</li>
        <li>Interaction data (clicks, workflows used, time spent on features, error logs)</li>
        <li>Session data and diagnostics used to improve performance and reliability</li>
      </ul>
      <p>
        We may use cookies, web beacons and similar technologies to collect this information (see Section 8).
      </p>
      <h3>5.5 Data from connected services and third parties</h3>
      <p>
        When you connect third-party services to the platform (for example, ad platforms, analytics tools, CRMs,
        DAMs or file storage services), we may receive information such as:
      </p>
      <ul>
        <li>Campaign, creative and performance data</li>
        <li>Audience segments and targeting configurations</li>
        <li>Assets, metadata and taxonomies</li>
        <li>User identifiers permitted by those services</li>
      </ul>
      <p>
        The specific data we receive depends on the permissions and settings you configure in those third-party
        services.
      </p>
      <p>We may also receive:</p>
      <ul>
        <li>
          Business contact data and company information from public sources and business information providers
        </li>
        <li>Information from partners and resellers who help promote or integrate our Services</li>
        <li>Contact details and interaction history from email, sales and customer support tools</li>
      </ul>
      <h3>5.6 Support, feedback and communications</h3>
      <p>
        When you contact us or interact with us via support channels, email, surveys, or events, we may collect:
      </p>
      <ul>
        <li>The content of your communications (emails, chat transcripts, support tickets)</li>
        <li>Details of issues raised, including screenshots or files you choose to share</li>
        <li>Survey responses, feature requests and feedback</li>
        <li>
          Recordings of calls or meetings, where legally permitted and, where required, with appropriate notice
          or consent
        </li>
      </ul>

      <h2>6. How we use your information</h2>
      <p>We use personal information for the following purposes, as permitted by applicable law:</p>
      <h3>1. To provide and operate the Services</h3>
      <ul>
        <li>Creating and managing accounts and workspaces</li>
        <li>Authenticating users and managing access rights</li>
        <li>Generating, storing and managing Inputs and Generated Content</li>
        <li>Providing collaboration, review, evaluation and workflow features</li>
      </ul>
      <h3>2. To personalise and improve the Services</h3>
      <ul>
        <li>Tailoring suggestions, templates and recommendations to your brand, industry or prior usage</li>
        <li>Configuring experiences for different roles (e.g., strategists, creatives, marketers)</li>
        <li>Analysing usage to inform product development and improve performance</li>
      </ul>
      <h3>3. To communicate with you</h3>
      <ul>
        <li>Sending service-related communications (security alerts, technical notices, updates, invoices)</li>
        <li>Responding to your requests, questions and support tickets</li>
        <li>
          Sending marketing communications (product updates, newsletters, events, surveys) where permitted by
          law; you can opt out of marketing at any time
        </li>
      </ul>
      <h3>4. For analytics, research and development</h3>
      <ul>
        <li>Monitoring and analysing usage, performance and trends</li>
        <li>Testing and developing new features, models and workflows</li>
        <li>
          Creating aggregated and anonymised or pseudonymised statistics that do not reasonably identify
          individuals
        </li>
      </ul>
      <h3>5. For security and misuse prevention</h3>
      <ul>
        <li>Detecting, preventing and investigating fraud, abuse or security incidents</li>
        <li>Protecting the integrity of our systems, models and Services</li>
        <li>Enforcing our Terms &amp; Conditions and other policies</li>
      </ul>
      <h3>6. To comply with legal obligations</h3>
      <ul>
        <li>Responding to lawful requests and legal process</li>
        <li>Fulfilling contractual and regulatory requirements</li>
        <li>Maintaining business and financial records as required by law</li>
      </ul>
      <p>
        Where required by law, we may rely on your consent for certain uses (for example, for some marketing
        communications or optional features) and you may withdraw such consent at any time.
      </p>

      <h2>7. How our AI systems use Inputs and Generated Content</h2>
      <p>
        Because we operate AI-based tools, it is important to explain how we handle Inputs and Generated Content:
      </p>
      <h3>1. Use for your account and organisation</h3>
      <ul>
        <li>
          We use your Inputs and Generated Content primarily to provide the Services to you and your
          organisation.
        </li>
        <li>
          This includes maintaining context within your workspace, enabling collaboration, showing your brand
          playbooks and history, and providing recommendations and variants based on your own data.
        </li>
      </ul>
      <h3>2. Model operation and configuration</h3>
      <ul>
        <li>
          We may use a combination of internally developed models and third-party AI models to generate Generated
          Content.
        </li>
        <li>
          We configure and contract with our AI infrastructure providers so that your Inputs and Generated
          Content are not used to train their base models that are shared across unrelated customers,{" "}
          <strong>except where you or your organisation explicitly opt in or provide specific instructions to the
          contrary.</strong>
        </li>
        <li>
          While we take reasonable technical and contractual measures to achieve this, we cannot control or
          guarantee the internal practices of all third-party providers.
        </li>
      </ul>
      <h3>3. Improving the Services</h3>
      <ul>
        <li>
          We may analyse Inputs and Generated Content to improve the quality, relevance and performance of the
          Services for you and your organisation.
        </li>
        <li>
          Where we use data to improve the Services more broadly (for example, to improve features that benefit
          multiple customers), we use techniques such as aggregation, anonymisation and/or pseudonymisation so
          that the information does not reasonably identify individuals or your organisation.
        </li>
        <li>
          We do not use such data for unrelated third-party advertising, and we do not attempt to re-identify
          individuals from data that we have taken steps to aggregate, anonymise or pseudonymise.
        </li>
      </ul>
      <h3>4. Human review and quality assurance</h3>
      <ul>
        <li>
          In limited cases, authorised personnel may review specific Inputs or Generated Content for support,
          troubleshooting, abuse investigation, or quality assurance purposes.
        </li>
        <li>
          Such access is strictly controlled and logged, and reviewers are bound by confidentiality obligations.
        </li>
      </ul>
      <p>We do not sell your Inputs or Generated Content to third parties.</p>

      <h2>8. Cookies and similar technologies</h2>
      <p>We use cookies and similar technologies (such as pixels, tags and local storage) to:</p>
      <ul>
        <li>Keep you signed in and maintain your session</li>
        <li>Remember your preferences and settings</li>
        <li>Improve security and detect suspicious activities</li>
        <li>Analyse usage of pages and features</li>
        <li>Support marketing and measure the effectiveness of campaigns</li>
      </ul>
      <p>
        You can manage cookies via your browser settings and, where applicable, through consent management tools
        provided on our website. If you disable certain cookies, some parts of the Services may not function
        properly.
      </p>

      <h2>9. How we share information</h2>
      <p>
        We do not sell your personal information. We may share personal information in the following
        circumstances:
      </p>
      <h3>Service providers (processors)</h3>
      <p>We engage third-party service providers to perform services on our behalf, such as:</p>
      <ul>
        <li>Cloud hosting and infrastructure</li>
        <li>Payment processing and billing</li>
        <li>Email, notifications and customer support tools</li>
        <li>Analytics, monitoring and diagnostics</li>
        <li>Security and fraud prevention</li>
      </ul>
      <p>
        These service providers are authorised to process personal information only as necessary to provide
        services to us and are subject to appropriate contractual and security obligations.
      </p>
      <h3>Third-party integrations you enable</h3>
      <p>
        When you connect the Services to other platforms (for example, advertising platforms, analytics tools,
        CRMs or storage services), we share and receive data as necessary to provide the integration according to
        the settings you configure. You can typically disconnect such integrations at any time through our
        platform or the third-party platform.
      </p>
      <h3>Your organisation and collaborators</h3>
      <ul>
        <li>
          Workspace owners, admins and other authorised users within your organisation may have access to
          information associated with that workspace
        </li>
        <li>
          Content shared into collaborative projects (including Inputs and Generated Content) may be visible to
          other users in the same workspace or project, as determined by your organisation’s settings.
        </li>
      </ul>
      <h3>Professional advisers and auditors</h3>
      <p>
        We may share information with our professional advisers (such as legal, tax and financial advisers) and
        auditors where reasonably necessary for the purposes of obtaining advice, managing risk and ensuring
        compliance.
      </p>
      <h3>Business transfers</h3>
      <p>
        If we are involved in a merger, acquisition, reorganisation, sale of assets, or similar transaction,
        personal information may be transferred as part of that transaction, subject to confidentiality and
        applicable law.
      </p>
      <h3>Legal and regulatory disclosures</h3>
      <p>
        We may disclose information if required to do so by law or where we reasonably believe that such
        disclosure is necessary to:
      </p>
      <ul>
        <li>Comply with applicable laws or respond to valid legal process</li>
        <li>Protect the rights, property or safety of the Company, our users or the public</li>
        <li>Detect, prevent or otherwise address fraud, security or technical issues</li>
      </ul>

      <h2>10. International transfers</h2>
      <p>
        We are based in India, but we may transfer, store and process personal information in countries other
        than India through our service providers and infrastructure.
      </p>
      <p>
        Where we transfer personal information across borders, we take appropriate steps to ensure that such
        transfers comply with applicable law and that the information remains protected in line with this Privacy
        Policy.
      </p>

      <h2>11. Data retention</h2>
      <p>We retain personal information for as long as necessary to:</p>
      <ul>
        <li>Provide and operate the Services</li>
        <li>Fulfil the purposes described in this Privacy Policy</li>
        <li>Comply with legal, accounting or reporting obligations</li>
        <li>Resolve disputes and enforce our agreements</li>
      </ul>
      <p>Retention periods may vary depending on the type of data and context. For example:</p>
      <ul>
        <li>
          Account and profile information is retained for the life of your account and a reasonable period
          thereafter.
        </li>
        <li>
          Billing and transaction records are generally kept for a number of years as required by financial and
          tax laws.
        </li>
        <li>
          Logs and technical data may be kept for a shorter period and then aggregated, anonymised or
          pseudonymised.
        </li>
        <li>Support communications are kept for as long as necessary for support and record purposes.</li>
      </ul>
      <p>
        We may retain anonymised or aggregated data that does not reasonably identify you for longer periods.
      </p>

      <h2>12. Your rights and choices</h2>
      <p>
        Depending on applicable law and where you are located, you may have some or all of the following rights
        regarding your personal information:
      </p>
      <ul>
        <li>
          <strong>Access:</strong> to request confirmation whether we process your personal information and to
          receive a copy of such information.
        </li>
        <li>
          <strong>Correction:</strong> to request correction of inaccurate or incomplete information
        </li>
        <li>
          <strong>Deletion:</strong> to request deletion of certain information, subject to legal or contractual
          retention obligations.
        </li>
        <li>
          <strong>Restriction or objection:</strong> to request restriction of certain processing or to object to
          certain uses (for example, for direct marketing)
        </li>
        <li>
          <strong>Data portability:</strong> to request a copy of your personal information in a structured,
          commonly used format, where technically feasible and required by law.
        </li>
        <li>
          <strong>Withdrawal of consent:</strong> where processing is based on consent, to withdraw your consent
          at any time without affecting the lawfulness of processing prior to withdrawal.
        </li>
      </ul>
      <p>
        To exercise your rights, please contact us at{" "}
        <a href="mailto:support@juicelabs.ai">support@juicelabs.ai</a>. We may request additional information to
        verify your identity and to help us respond to your request.
      </p>
      <p>
        Where we process personal information on behalf of one of our customers (for example, as a processor of
        end-customer data), we may redirect your request to that customer, as they are responsible for handling
        such requests.
      </p>
      <p>
        You may also have the right to lodge a complaint with the relevant data protection authority in your
        jurisdiction.
      </p>

      <h2>13. Data security</h2>
      <p>
        We implement reasonable technical and organisational measures designed to protect personal information
        from loss, misuse, unauthorised access, disclosure, alteration and destruction. These measures include,
        where appropriate:
      </p>
      <ul>
        <li>Encryption in transit and at rest</li>
        <li>Access controls and authentication</li>
        <li>Logging, monitoring and intrusion detection</li>
        <li>Regular backups and disaster recovery measures</li>
        <li>Employee confidentiality obligations and training</li>
      </ul>
      <p>
        No method of transmission over the internet or method of electronic storage is completely secure, and{" "}
        <strong>we cannot guarantee absolute security.</strong> If you have reason to believe that your account or
        interaction with us is no longer secure, please contact us immediately.
      </p>

      <h2>14. Children’s privacy</h2>
      <p>
        Our Services are designed for business and professional use and are{" "}
        <strong>not intended for children</strong>. We do not knowingly collect personal information from children
        under the age of 18.
      </p>
      <p>
        If we become aware that we have collected personal information from a child in violation of this Policy or
        applicable law, we will take steps to delete such information. If you believe that a child has provided us
        with personal information, please contact us.
      </p>

      <h2>15. Third-party sites and services</h2>
      <p>
        The Services may contain links to or integrations with third-party websites, apps or services. We are not
        responsible for the privacy practices, content or policies of such third parties.
      </p>
      <p>
        We encourage you to review the privacy policies of any third-party sites or services you use in
        connection with our Services.
      </p>

      <h2>16. Changes to this Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices, technologies,
        legal requirements or other factors.
      </p>
      <p>When we make material changes, we will provide notice by:</p>
      <ul>
        <li>Updating the “Last updated” date at the top of this Policy, and/or</li>
        <li>Providing additional notice (for example, by email or in-product notification)</li>
      </ul>
      <p>
        Your continued use of the Services after the effective date of any changes constitutes your acceptance of
        the revised Privacy Policy. If you do not agree to the changes, you should stop using the Services.
      </p>

      <h2>17. Contact us</h2>
      <p>
        If you have any questions, concerns or complaints about this Privacy Policy or our data practices, please
        contact us at:
      </p>
      <p>
        Email: <a href="mailto:support@juicelabs.ai">support@juicelabs.ai</a>
      </p>
    </LegalLayout>
  );
}
