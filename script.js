const goalButtons = document.querySelectorAll("[data-goal]");
const products = document.querySelectorAll("[data-product-goal]");

goalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const goal = button.dataset.goal;

    goalButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", item === button ? "true" : "false");
    });

    products.forEach((product) => {
      const matches = goal === "todos" || product.dataset.productGoal.includes(goal);
      product.hidden = !matches;
    });
  });
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth" });
  });
});
