async function getList(page) {
  const response = await fetch(
    `https://iranticket.co/api/v1/Pool/poolList/?page=${page}`,
  );

  const list = await response.json();

  console.log(list.pool);

  // =========================
  // Pagination
  // =========================

  const pages = document.querySelectorAll(".page-btn");
  const pagePrev = document.querySelector(".page-prev");
  const pageNext = document.querySelector(".page-next");

  pages.forEach((btn) => {
    btn.addEventListener("click", () => {
      const num = Number(btn.textContent);

      getList(num);
    });
  });

  let startPage = 1;
  const pagesPerGroup = 5;

  // Show current page group
  function showPageGroup() {
    pages.forEach((btn, index) => {
      const pageNumber = index + 1;

      if (pageNumber >= startPage && pageNumber < startPage + pagesPerGroup) {
        btn.hidden = false;
      } else {
        btn.hidden = true;
      }
    });
  }

  // Initial pages
  showPageGroup();

  // Next page group
  pageNext.addEventListener("click", () => {
    if (startPage + pagesPerGroup <= pages.length) {
      startPage += pagesPerGroup;

      showPageGroup();
    }
  });

  // Previous page group
  pagePrev.addEventListener("click", () => {
    if (startPage > 1) {
      startPage -= pagesPerGroup;

      showPageGroup();
    }
  });

  // Page buttons
  pages.forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = Number(btn.textContent);

      getList(page);
    });
  });
  // =========================
  // Cards
  // =========================

  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    const resultId = list.pool[index];

    if (!resultId) {
      card.hidden = true;
      return;
    }

    card.hidden = false;

    // Data ID
    card.dataset.id = resultId.id;

    // =========================
    // Image
    // =========================

    const img = card.querySelector(".card-img");

    img.src = "https://iranticket.co/" + resultId.poolImg[0].src;

    // =========================
    // Title
    // =========================

    const textBox = card.querySelector(".text-box");

    const title = textBox.querySelector(".card-title");

    title.textContent = resultId.title;

    // =========================
    // Address
    // =========================

    const addressBox = textBox.querySelector(".address-box");

    const location = addressBox.querySelector(".address");

    location.textContent = resultId.add;

    // =========================
    // View Pool
    // =========================

    const buttonBox = card.querySelector(".button-box");

    const button = buttonBox.querySelector(".view-pool");

    button.href = `detail.html?link=${resultId.link}`;
  });

  // =========================
  // Filter Elements
  // =========================

  const justPools = document.querySelector(".just-pools");

  const justWarterParks = document.querySelector(".just-water-parks");

  const justMassage = document.querySelector(".massage");

  const ostanBtn = document.querySelector(".choose-ostan");

  const ostanList = document.querySelector(".ostan-list");

  const ostanItem = document.querySelectorAll(".ostan-item");

  const cityList = document.querySelector(".city-list");

  const genderFilter = document.querySelectorAll(".gender-type");

  const removeFilters = document.querySelector(".remove-filters");

  // =========================
  // Helper: Show Filtered Cards
  // =========================

  function showFilteredCards(filteredPools) {
    // Hide all cards
    cards.forEach((card) => {
      card.hidden = true;
    });

    // Show filtered cards
    filteredPools.forEach((pool) => {
      const card = document.querySelector(`[data-id="${pool.id}"]`);

      if (card) {
        card.hidden = false;
      }
    });
  }

  // =========================
  // Type Filter - Pool
  // =========================

  justPools.addEventListener("click", () => {
    const filteredPools = list.pool.filter((item) => {
      return item.type === "pool";
    });

    console.log(filteredPools);

    showFilteredCards(filteredPools);
  });

  // =========================
  // Type Filter - Waterpark
  // =========================

  justWarterParks.addEventListener("click", () => {
    const filteredPools = list.pool.filter((item) => {
      return item.type === "waterpark";
    });

    console.log(filteredPools);

    showFilteredCards(filteredPools);
  });

  // =========================
  // Type Filter - Massage
  // =========================

  justMassage.addEventListener("click", () => {
    const filteredPools = list.pool.filter((item) => {
      return item.type === "massage";
    });

    console.log(filteredPools);

    showFilteredCards(filteredPools);
  });

  // =========================
  // Ostan List
  // =========================

  ostanBtn.addEventListener("click", () => {
    ostanList.classList.toggle("hidden");

    ostanList.classList.toggle("flex");
  });

  // =========================
  // Ostan Filter
  // =========================

  ostanItem.forEach((item) => {
    item.addEventListener("click", () => {
      const ostanName = item.dataset.ostan;

      console.log("Ostan:", ostanName);

      const ostanFilter = list.pool.filter((pool) => {
        return pool.ostan === ostanName;
      });

      console.log(ostanFilter);

      // Clear previous cities
      cityList.innerHTML = "";

      // Hide all cards
      cards.forEach((card) => {
        card.hidden = true;
      });

      // Show filtered cards
      ostanFilter.forEach((pool) => {
        const card = document.querySelector(`[data-id="${pool.id}"]`);

        if (card) {
          card.hidden = false;
        }
      });
    });
  });

  // =========================
  // Gender Filter
  // =========================

  genderFilter.forEach((item) => {
    item.addEventListener("click", () => {
      const genderType = Number(item.dataset.gender);

      console.log("Gender:", genderType);

      // 0 = All
      if (genderType === 0) {
        cards.forEach((card) => {
          card.hidden = false;
        });

        return;
      }

      const filteredGender = list.pool.filter((pool) => {
        return pool.sex === genderType;
      });

      console.log(filteredGender);

      showFilteredCards(filteredGender);
    });
  });

  // =========================
  // Remove Filters
  // =========================

  removeFilters.addEventListener("click", () => {
    // Show all cards
    cards.forEach((card) => {
      card.hidden = false;
    });

    // Clear city list
    cityList.innerHTML = "";

    // Remove active classes
    genderFilter.forEach((item) => {
      item.classList.remove("active");
    });

    ostanItem.forEach((item) => {
      item.classList.remove("active");
    });
  });
}

// =========================
// Start
// =========================

getList(1);
