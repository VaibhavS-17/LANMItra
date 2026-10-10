Experiment No. 10
Aim:- Legal Compliance & IPR Basics (Case Study: LANMitra - Gaming Tournament & LAN Café Booking Platform)

Legal Compliance of LANMitra: LAN Café Booking & Esports Tournament Platform
LANMitra ensures user data protection, intellectual property compliance, and transparent digital bookings. It connects gaming café owners, tournament organizers, and players. The platform collects necessary personal information such as names, gamer tags, email addresses, contact details, and booking schedules only after obtaining explicit user consent. Sensitive account data is protected through password encryption, secure token management, and role-based access controls.

As a web-based booking portal and digital intermediary for local tournaments, LANMitra maintains a clear Privacy Policy, Terms of Service, and a dispute resolution system. All website code, user interfaces, database designs, and bracket algorithms are original or legally licensed, while platform branding and logos are trademark-protected, ensuring trust, fair play, and operational compliance for both café owners and gamers.

Data Privacy and the DPDP Act, 2023 – LANMitra
LANMitra processes user information such as names, emails, gamer tags, phone numbers, station booking timestamps, and tournament match records. Under the Digital Personal Data Protection (DPDP) Act, 2023, the platform adheres to the following requirements:
- Obtain explicit and informed consent before collecting user credentials or personal details during registration.
- Clearly explain the purpose of data collection (account authentication, station reservation confirmation, bracket seeding, and match dispute resolution).
- Allow users to withdraw consent, modify profile details, and request deletion of their account and historical booking records.
- Store data securely using BCrypt password hashing, stateless JSON Web Tokens (JWT), and relational database constraints.
- Avoid sharing personal player data with third-party advertising networks without explicit permission.
- Retain data only for necessary operational periods (active bookings, ongoing tournaments, and audit logs).

IT Act, 2000 and Intermediary Guidelines – LANMitra
As an online platform facilitating café bookings and community esports tournaments, LANMitra operates as a digital intermediary under the Information Technology Act, 2000 and the IT Rules, 2021. The platform must:
- Implement reasonable security practices under Section 43A to prevent data leaks or unauthorized access to user accounts and booking records.
- Enforce strict authentication and authorization via Spring Security to prevent account takeover and unauthorized administrative access.
- Prohibit abusive behavior, impersonation, cheating, and offensive gamer tags through enforceable Terms of Service.
- Act as a responsible intermediary by maintaining an active Privacy Policy and appointing a Grievance Officer to address booking disputes and harassment complaints.
- Provide a transparent dispute redressal mechanism for conflicting match scores submitted during tournaments.

Handling Sensitive User Data – LANMitra
While LANMitra does not process biometric or medical records, it manages sensitive digital information including login credentials, session tokens, café revenue figures, and personal contact details. Best practices include:
- Hashing all user passwords with BCrypt before storing them in the MySQL database so plaintext credentials are never exposed.
- Issuing signed, short-lived JWT tokens for stateless API authentication, preventing session hijacking.
- Restricting data access through Role-Based Access Control (RBAC), ensuring café owners can only view their own station schedules and players only access their personal bookings.
- Maintaining system audit logs for administrative interventions, such as manual resolution of disputed match results.
- Providing users with the ability to manage profile information and request account deactivation.

Intellectual Property Rights (IPR) – LANMitra
LANMitra relies on multiple forms of intellectual property to protect its software assets, user interface, and market identity:

1. Copyright
- Original source code across the React 18 frontend and Spring Boot 3 backend is protected under copyright law.
- User interface designs, styling sheets, component architectures, and system documentation are proprietary creations.
- Open-source libraries (such as React, Vite, Spring Boot, and Axios) are used in strict compliance with their respective open licenses (MIT, Apache 2.0).

2. Trademark
- The platform brand name "LANMitra", official logo, and tagline are protected under trademark law in Class 9 (Software) and Class 41 (Gaming & Entertainment Services).
- Avoids misleading use of third-party game logos (such as Riot Games, Valve, or Krafton), referencing game titles purely nominatively to indicate tournament categories.

3. Licensing Agreements
- Third-party packages, icons (Lucide Icons), and web fonts are used under verified open-source commercial licenses.
- API terms and dependencies are monitored to prevent licensing conflicts and ensure free distribution of the academic software.

Patent Considerations – LANMitra
LANMitra features proprietary logic including a deterministic time-slot overlap detection algorithm and an automated single-elimination bracket generator with bye balancing. While general software algorithms face specific patent requirements in India, key steps to protect technical innovation include:
- Documenting system architecture, database conflict queries, and bracket seeding algorithms in technical reports to establish prior art and trade secret protection.
- Maintaining detailed version control records with timestamps and authorship across Git commits.
- Securing a competitive advantage by maintaining robust software implementation and reliable execution over competitors.

Case Study: Applying Legal and IPR Compliance to LANMitra
LANMitra integrates legal compliance, data privacy, and intellectual property principles into its core system design to ensure fair play, secure reservations, and transparent tournament administration.

User Data and Consent:
LANMitra registers players, café owners, and tournament organizers with explicit consent checkboxes. Users are informed that their data is used solely for station scheduling, leaderboard tracking, and match communication. Role-based privileges ensure that sensitive café revenue numbers are hidden from general players.

Fair Play, Match Reporting & Tournament Integrity:
In competitive esports, false score reporting is a major issue. LANMitra implements a consensus state machine where both opponents submit match scores independently. If reports match, the winner advances automatically. If scores conflict, the match is locked into a disputed state for organizer review, ensuring ethical play and administrative fairness.

Protecting the Platform's Intellectual Property:
LANMitra's backend business logic (overlap prevention, bracket generation) and frontend user interfaces remain the intellectual property of the development team. Terms of Service prohibit scraping, reverse engineering, or unauthorized distribution of platform software.

Challenges and Ethical Risks:
Operating a multi-user gaming platform presents several legal and ethical challenges:
- Booking no-shows and double-booking disputes between walk-in customers and online reservations.
- Fraudulent match reporting or collusion among tournament participants.
- Harassment or offensive usernames in community leaderboards.
- Unauthorized access or token compromise on public cyber café computers.

Conclusion – LANMitra
LANMitra provides a structured, secure, and legally compliant platform for gaming café reservations and grassroots tournament management. By adhering to the DPDP Act, 2023 and the IT Act, 2000, user data is collected transparently and secured using BCrypt hashing and JWT role-based access controls. Proprietary code, bracket engines, and branding are safeguarded through copyright, trademark, and open-source licensing compliance. Furthermore, dual-verification score tracking ensures ethical conduct and fair play, establishing a reliable ecosystem for local gamers, café owners, and esports organizers.

Learning Outcomes – LANMitra
- Gained an understanding of the DPDP Act, 2023 and the necessity of explicit consent in multi-user booking platforms.
- Understood intermediary obligations and grievance redressal under the IT Act, 2000.
- Learned how to apply copyright, trademark, and licensing practices to full-stack software applications.
- Identified operational, security, and ethical risks associated with online reservations and tournament score validation.
- Recognized the importance of role-based access control and encryption in protecting sensitive user credentials.
