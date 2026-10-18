// Lets "Get a quote for …" buttons anywhere on the page pre-select a service
// in the contact form without sharing React state.
export const QUOTE_SERVICE_EVENT = "paco:quote-service";

export function requestQuote(serviceId) {
  window.dispatchEvent(
    new CustomEvent(QUOTE_SERVICE_EVENT, { detail: { service: serviceId } })
  );
}
