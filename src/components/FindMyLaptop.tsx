"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, Product } from "@/data/products";
import styles from "./FindMyLaptop.module.css";

const BUDGETS = [
  { id: "under-15000", label: "Under ₹15,000" },
  { id: "15000-25000", label: "₹15,000–₹25,000" },
  { id: "25000-35000", label: "₹25,000–₹35,000" },
  { id: "over-35000", label: "Above ₹35,000" },
] as const;

const USES = [
  { id: "office", label: "Office and Business" },
  { id: "study", label: "Study and Online Classes" },
  { id: "coding", label: "Coding and Development" },
  { id: "design", label: "Design and Content Creation" },
  { id: "everyday", label: "Everyday Browsing" },
  { id: "performance", label: "Performance-Intensive Work" },
] as const;

const REQUIREMENTS = [
  { id: "ram", label: "More RAM" },
  { id: "ssd", label: "Faster SSD storage" },
  { id: "processor", label: "Better processor performance" },
  { id: "portable", label: "Lightweight and portable" },
] as const;

type BudgetId = (typeof BUDGETS)[number]["id"];
type UseId = (typeof USES)[number]["id"];
type RequirementId = (typeof REQUIREMENTS)[number]["id"];

function matchesBudget(product: Product, budget: BudgetId) {
  switch (budget) {
    case "under-15000":
      return product.numericPrice < 15000;
    case "15000-25000":
      return product.numericPrice >= 15000 && product.numericPrice < 25000;
    case "25000-35000":
      return product.numericPrice >= 25000 && product.numericPrice <= 35000;
    case "over-35000":
      return product.numericPrice > 35000;
  }
}

function matchesUse(product: Product, use: UseId) {
  const details = `${product.name} ${product.subtitle} ${product.description}`.toLowerCase();
  switch (use) {
    case "office":
      return product.category === "business-laptops";
    case "study":
      return product.category === "student-laptops" || /classes|coursework|student/.test(details);
    case "coding":
      return product.category === "performance-laptops" || /multitasking|development|coding/.test(details);
    case "design":
      return product.category === "creator-laptops" || /creative|design/.test(details);
    case "everyday":
      return /everyday|browsing|browser|home use|streaming/.test(details);
    case "performance":
      return product.category === "performance-laptops" || /demanding workloads|gaming/.test(details);
  }
}

function getRamGb(product: Product) {
  const match = product.sizes.join(" ").match(/(\d+)\s*GB\s*RAM/i);
  return match ? Number(match[1]) : null;
}

function getSsdGb(product: Product) {
  const match = product.sizes.join(" ").match(/(\d+)\s*(GB|TB)\s*SSD/i);
  if (!match) return null;
  return Number(match[1]) * (match[2].toUpperCase() === "TB" ? 1024 : 1);
}

function matchesRequirements(product: Product, requirements: RequirementId[]) {
  const details = `${product.name} ${product.subtitle} ${product.description}`.toLowerCase();
  return requirements.every((requirement) => {
    switch (requirement) {
      case "ram": {
        const ram = getRamGb(product);
        return ram !== null && ram >= 16;
      }
      case "ssd": {
        const storage = getSsdGb(product);
        return storage !== null && storage >= 512;
      }
      case "portable":
        return /lightweight|slim|compact|travel|on the go/.test(details);
      case "processor":
        return true;
    }
  });
}

export default function FindMyLaptop() {
  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState<BudgetId | null>(null);
  const [intendedUse, setIntendedUse] = useState<UseId | null>(null);
  const [requirements, setRequirements] = useState<RequirementId[]>([]);

  const toggleRequirement = (requirement: RequirementId) => {
    setRequirements((current) =>
      current.includes(requirement)
        ? current.filter((item) => item !== requirement)
        : [...current, requirement]
    );
  };

  const baseMatches = PRODUCTS.filter(
    (product) => budget && intendedUse && matchesBudget(product, budget) && matchesUse(product, intendedUse)
  );
  const preferenceMatches = baseMatches.filter((product) =>
    matchesRequirements(product, requirements)
  );
  const hasPreferenceMatches = preferenceMatches.length > 0;
  const recommendations = (hasPreferenceMatches ? preferenceMatches : baseMatches).slice(0, 3);
  const selectedUseLabel = USES.find((item) => item.id === intendedUse)?.label;
  const processorDetailsUnavailable = requirements.includes("processor");

  const startAgain = () => {
    setStep(1);
    setBudget(null);
    setIntendedUse(null);
    setRequirements([]);
  };

  return (
    <section className={styles.section} aria-labelledby="find-laptop-heading">
      <div className={styles.intro}>
        <h2 className={styles.heading} id="find-laptop-heading">Find the Right Laptop for You</h2>
        <p className={styles.description}>
          Tell us what you need, and we&apos;ll help you find the right refurbished laptop for your budget.
        </p>
      </div>

      <div className={styles.panel}>
        {step < 4 ? (
          <>
            <div className={styles.stepIndicator} aria-live="polite">
              Step {step} of 3
            </div>

            {step === 1 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.question}>What&apos;s your budget?</legend>
                <div className={styles.options}>
                  {BUDGETS.map((option) => (
                    <label className={styles.option} key={option.id}>
                      <input
                        className={styles.optionInput}
                        type="radio"
                        name="laptop-budget"
                        value={option.id}
                        checked={budget === option.id}
                        onChange={() => setBudget(option.id)}
                      />
                      <span className={styles.optionLabel}>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.question}>What will you use your laptop for?</legend>
                <div className={styles.options}>
                  {USES.map((option) => (
                    <label className={styles.option} key={option.id}>
                      <input
                        className={styles.optionInput}
                        type="radio"
                        name="laptop-use"
                        value={option.id}
                        checked={intendedUse === option.id}
                        onChange={() => setIntendedUse(option.id)}
                      />
                      <span className={styles.optionLabel}>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.question}>What matters most to you?</legend>
                <p className={styles.helper}>Choose any that apply, or skip this step.</p>
                <div className={styles.options}>
                  {REQUIREMENTS.map((option) => (
                    <label className={styles.option} key={option.id}>
                      <input
                        className={styles.optionInput}
                        type="checkbox"
                        checked={requirements.includes(option.id)}
                        onChange={() => toggleRequirement(option.id)}
                      />
                      <span className={styles.optionLabel}>{option.label}</span>
                    </label>
                  ))}
                </div>
                <button
                  className={styles.skipButton}
                  onClick={() => setRequirements([])}
                  type="button"
                >
                  No specific preference
                </button>
              </fieldset>
            )}

            <div className={styles.actions}>
              {step > 1 && (
                <button className={styles.secondaryButton} onClick={() => setStep(step - 1)} type="button">
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  className={styles.primaryButton}
                  onClick={() => setStep(step + 1)}
                  disabled={(step === 1 && !budget) || (step === 2 && !intendedUse)}
                  type="button"
                >
                  Continue
                </button>
              ) : (
                <button className={styles.primaryButton} onClick={() => setStep(4)} type="button">
                  Show my matches
                </button>
              )}
            </div>
          </>
        ) : (
          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <div>
                <h3 className={styles.resultsTitle}>Your laptop matches</h3>
                <p className={styles.helper}>
                  {selectedUseLabel} · {BUDGETS.find((item) => item.id === budget)?.label}
                </p>
              </div>
              <button className={styles.secondaryButton} onClick={() => setStep(1)} type="button">
                Change answers
              </button>
            </div>

            {recommendations.length > 0 ? (
              <>
                {!hasPreferenceMatches && requirements.length > 0 && (
                  <p className={styles.notice} role="status">
                    No listed laptops match every selected preference. These alternatives match your budget and use; try removing a preference to broaden the results.
                  </p>
                )}
                {processorDetailsUnavailable && (
                  <p className={styles.notice}>
                    Processor details aren&apos;t included in the current inventory, so recommendations can&apos;t be compared on processor performance.
                  </p>
                )}
                <div className={styles.recommendations}>
                  {recommendations.map((product) => {
                    const ram = getRamGb(product);
                    const storage = getSsdGb(product);
                    const reasons = [
                      "Within your selected budget",
                      `Listed for ${selectedUseLabel?.toLowerCase()}`,
                    ];
                    if (requirements.includes("ram") && ram !== null && ram >= 16) {
                      reasons.push(`${ram} GB RAM`);
                    }
                    if (requirements.includes("ssd") && storage !== null && storage >= 512) {
                      reasons.push(`${storage >= 1024 ? `${storage / 1024} TB` : `${storage} GB`} SSD`);
                    }
                    if (requirements.includes("portable")) {
                      reasons.push("Listing describes it as slim, compact, or lightweight");
                    }

                    return (
                      <div className={styles.recommendation} key={product.id}>
                        <ProductCard product={product} />
                        <p className={styles.reason}>{reasons.join(" · ")}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className={styles.noResults} role="status">
                <p>No listed laptops match both this budget and intended use.</p>
                <p>Try a different budget or use to see other available demo listings.</p>
              </div>
            )}

            <button className={styles.startAgainButton} onClick={startAgain} type="button">
              Start again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
