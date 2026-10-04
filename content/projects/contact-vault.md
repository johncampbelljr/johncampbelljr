---
title: Contact Vault
slug: contact-vault
number: '001'
status: IPHONE APP
description: An iPhone app that puts a cooling-off timer between you and selected contacts, with encrypted storage that stays on your device.
featured: true
technologies: [iOS, CryptoKit, Keychain]
---

## A pause before reaching out

Contact Vault helps create distance from contacts you want to keep but don't want to reach impulsively. A delay gives you time to reconsider before calling or messaging.

<img
  class="project-screenshot"
  src="../../images/projects/contact-vault.png"
  alt="Contact Vault on iPhone showing a contact cooling off with 2 hours and 14 minutes until access, plus available and locked contacts."
  width="672"
  height="1270"
/>

## How it works

1. **Lock a contact.** Move it out of your address book and into an encrypted vault on your iPhone.
2. **Request access.** Wait through your chosen cooling-off period, from minutes to a week.
3. **Choose what comes next.** During a brief unlock window, call, message, or restore the contact. The vault closes automatically afterward.

Shortening the delay requires waiting out the existing delay first; running timers never shrink.

## Private by design

Contact Vault uses AES-256-GCM through Apple's CryptoKit, with its encryption key stored in the device Keychain. It has no accounts, backend, or analytics.

Restoring a contact brings back its details, except Notes, which Apple restricts. Restore any contacts you need before deleting the app, since deletion also removes the vault.

## How I built it

Contact Vault was a solo project built with Claude Code. Claude Code handled most of the implementation, with very little hand-written code from me.

[Visit Contact Vault →](https://contactvault.app/)
