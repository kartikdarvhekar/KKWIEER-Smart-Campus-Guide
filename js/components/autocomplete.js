/**
 * Autocomplete Input Component
 * High-performance instant search across all campus directory entries
 */

import { CAMPUS_DIRECTORY } from "../data/campus-directory.js";

export class Autocomplete {
  /**
   * @param {Object} options
   * @param {HTMLInputElement} options.inputEl
   * @param {HTMLElement} options.dropdownEl
   * @param {HTMLButtonElement} [options.clearBtnEl]
   * @param {Function} options.onSelect - Callback(selectedItem)
   * @param {string} [options.initialNodeId]
   */
  constructor({ inputEl, dropdownEl, clearBtnEl, onSelect, initialNodeId = null }) {
    this.input = inputEl;
    this.dropdown = dropdownEl;
    this.clearBtn = clearBtnEl;
    this.onSelect = onSelect;
    this.selectedItem = null;
    this.currentCategory = "ALL";
    this.activeIndex = -1;
    this.filteredResults = [];

    this.init();

    if (initialNodeId) {
      const match = CAMPUS_DIRECTORY.find((r) => r.id === initialNodeId);
      if (match) {
        this.setSelection(match, false);
      }
    }
  }

  init() {
    this.input.addEventListener("input", () => this.handleInput());
    this.input.addEventListener("focus", () => this.handleFocus());
    this.input.addEventListener("keydown", (e) => this.handleKeydown(e));

    if (this.clearBtn) {
      this.clearBtn.addEventListener("click", () => this.clear());
      this.updateClearBtnVisibility();
    }

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!this.input.contains(e.target) && !this.dropdown.contains(e.target)) {
        this.closeDropdown();
      }
    });
  }

  setCategoryFilter(category) {
    this.currentCategory = category;
    if (!this.dropdown.classList.contains("hidden")) {
      this.renderSuggestions(this.input.value.trim());
    }
  }

  handleFocus() {
    const query = this.input.value.trim();
    this.renderSuggestions(query);
  }

  handleInput() {
    this.updateClearBtnVisibility();
    const query = this.input.value.trim();
    this.renderSuggestions(query);
  }

  updateClearBtnVisibility() {
    if (this.clearBtn) {
      if (this.input.value.length > 0) {
        this.clearBtn.classList.remove("hidden");
      } else {
        this.clearBtn.classList.add("hidden");
      }
    }
  }

  search(query) {
    const q = query.toLowerCase();
    return CAMPUS_DIRECTORY.filter((item) => {
      // Category filter check
      if (this.currentCategory !== "ALL" && item.category !== this.currentCategory) {
        return false;
      }

      if (!q) return true; // Show all if query is empty

      const codeMatch = item.code.toLowerCase().includes(q);
      const nameMatch = item.name.toLowerCase().includes(q);
      const deptMatch = item.department.toLowerCase().includes(q);
      const wingMatch = `wing ${item.wing}`.toLowerCase().includes(q);
      const floorMatch = `level ${item.floor}`.toLowerCase().includes(q) || `floor ${item.floor}`.toLowerCase().includes(q);
      const keywordMatch = item.keywords && item.keywords.some((k) => k.toLowerCase().includes(q));

      return codeMatch || nameMatch || deptMatch || wingMatch || floorMatch || keywordMatch;
    }).slice(0, 10); // Return top 10 matches
  }

  renderSuggestions(query) {
    this.filteredResults = this.search(query);
    this.activeIndex = -1;

    if (this.filteredResults.length === 0) {
      this.dropdown.innerHTML = `<div class="dropdown-empty">No matching rooms or facilities found</div>`;
      this.dropdown.classList.remove("hidden");
      return;
    }

    const html = this.filteredResults
      .map((item, idx) => {
        const wingText = item.wing === "CENTRAL" ? "Central" : `Wing ${item.wing}`;
        const floorText = item.floor === "G" ? "Ground" : `L${item.floor}`;

        return `
          <div class="dropdown-item" data-index="${idx}">
            <div class="item-main">
              <span class="item-code">${this.highlightMatch(item.code, query)}</span>
              <span class="item-name">${this.highlightMatch(item.name, query)}</span>
            </div>
            <div class="item-tags">
              <span class="item-badge">${wingText}</span>
              <span class="item-badge">${floorText}</span>
            </div>
          </div>
        `;
      })
      .join("");

    this.dropdown.innerHTML = html;
    this.dropdown.classList.remove("hidden");

    // Click listeners
    this.dropdown.querySelectorAll(".dropdown-item").forEach((el) => {
      el.addEventListener("click", () => {
        const index = parseInt(el.getAttribute("data-index"), 10);
        this.selectIndex(index);
      });
    });
  }

  highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return text.replace(regex, "<strong>$1</strong>");
  }

  handleKeydown(e) {
    if (this.dropdown.classList.contains("hidden")) {
      if (e.key === "ArrowDown") {
        this.renderSuggestions(this.input.value.trim());
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.activeIndex = (this.activeIndex + 1) % this.filteredResults.length;
      this.updateActiveItem();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.activeIndex = (this.activeIndex - 1 + this.filteredResults.length) % this.filteredResults.length;
      this.updateActiveItem();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (this.activeIndex >= 0 && this.activeIndex < this.filteredResults.length) {
        this.selectIndex(this.activeIndex);
      }
    } else if (e.key === "Escape") {
      this.closeDropdown();
    }
  }

  updateActiveItem() {
    const items = this.dropdown.querySelectorAll(".dropdown-item");
    items.forEach((item, idx) => {
      if (idx === this.activeIndex) {
        item.classList.add("focused");
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.classList.remove("focused");
      }
    });
  }

  selectIndex(index) {
    const item = this.filteredResults[index];
    if (item) {
      this.setSelection(item, true);
    }
  }

  setSelection(item, triggerCallback = true) {
    this.selectedItem = item;
    this.input.value = `${item.name} (${item.code})`;
    this.input.setAttribute("data-node-id", item.id);
    this.closeDropdown();
    this.updateClearBtnVisibility();

    if (triggerCallback && this.onSelect) {
      this.onSelect(item);
    }
  }

  clear() {
    this.selectedItem = null;
    this.input.value = "";
    this.input.removeAttribute("data-node-id");
    this.closeDropdown();
    this.updateClearBtnVisibility();
    this.input.focus();
    if (this.onSelect) {
      this.onSelect(null);
    }
  }

  closeDropdown() {
    this.dropdown.classList.add("hidden");
    this.activeIndex = -1;
  }
}
