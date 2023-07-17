"use strict";

angular.module("GenesisApp").service("FileProcessor", () => {
  return {
    read: file => {
      return new Promise((resolve, reject) => {
        if (typeof file === "undefined" || file === null || file === "") {
          throw new Error("[FileProcessor] Invalid filename");
        }

        const fileReader = new FileReader();

        fileReader.onload = event => {
          resolve(event.target.result);
        };

        fileReader.readAsDataURL(file);
      });
    }
  };
});
