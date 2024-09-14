const years: { name: string; linkName: string }[] = [];
for (let year = 2024; year >= 1950; year--) {
  years.push({ name: year.toString(), linkName: year.toString() });
}

export { years };
