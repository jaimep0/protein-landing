const goalButtons = document.querySelectorAll("[data-goal]");
const products = document.querySelectorAll("[data-product-goal]");
const searchInput = document.querySelector("#search");

const filterProducts = (goal = document.querySelector(".filter.is-active")?.dataset.goal || "todos") => {
  const query = searchInput?.value.trim().toLowerCase() || "";

  products.forEach((product) => {
    const text = product.textContent.toLowerCase();
    const matchesGoal = goal === "todos" || product.dataset.productGoal.includes(goal);
    const matchesSearch = !query || text.includes(query);
    product.hidden = !matchesGoal || !matchesSearch;
  });
};

goalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const goal = button.dataset.goal;

    goalButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", item === button ? "true" : "false");
    });

    filterProducts(goal);
  });
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-chip-goal]").forEach((chip) => {
  chip.addEventListener("click", () => {
    const target = document.querySelector(`[data-goal="${chip.dataset.chipGoal}"]`);
    target?.click();
  });
});

searchInput?.addEventListener("input", () => filterProducts());
