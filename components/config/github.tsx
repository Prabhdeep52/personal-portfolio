/*
 * GitHub Contribution Configuration
 *
 * This file contains the configuration for the GitHub contribution graph.
 * Update the username to match your GitHub profile.
 */

export const githubConfig = {
  username: "Prabhdeep52",
  apiUrl: "https://github-contributions-api.deno.dev",

  // Display settings
  title: "Featured",
  subtitle: "",

  // Chart settings
  blockSize: 11,
  blockMargin: 3,
  fontSize: 12,
  maxLevel: 4,

  // Month labels
  months: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  // Weekday labels (empty for weekends, M for Monday, etc.)
  weekdays: ["", "M", "", "W", "", "F", ""],

  // Total count label template
  totalCountLabel: "{{count}} contributions in the last year",

  // Theme configuration for dark and light modes
  theme: {
    light: [
      "rgb(200, 200, 200)", // Light gray
      "rgb(155, 233, 168)", // Light green
      "rgb(64, 196, 99)", // Medium green
      "rgb(48, 161, 78)", // Dark green
      "rgb(33, 110, 57)", // Very dark green
    ],
  },

  // Error state configuration
  errorState: {
    title: "Unable to load GitHub contributions",
    description: "Check out my profile directly for the latest activity",
    buttonText: "View on GitHub",
  },

  // Loading state configuration
  loadingState: {
    title: "Loading contributions...",
    description: "Fetching your GitHub activity data",
  },
};
