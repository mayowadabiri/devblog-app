export const parseContent = (blogContent) => {
    const content = blogContent.split(" ");
    let newContent = [];
    let count = 0;
    for (let s of content) {
      for (let x = 0; x < s.length; x++) {
        count++;
      }
      if (count > 210) {
        break;
      }
      newContent.push(s);
    }
    return newContent.join(" ");
  };

