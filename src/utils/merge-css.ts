const mergeCss = (...classNames: (string | undefined)[]) => {
  let result: string = "";

  classNames.forEach(className => {
    if (typeof className === "undefined") {
      return;
    }

    result = result.concat(`${className} `);
  });

  return result.trim();
};

export default mergeCss;
