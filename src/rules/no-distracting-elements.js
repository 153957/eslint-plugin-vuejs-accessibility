const {
  defineTemplateBodyVisitor,
  getLiteralAttributeValue,
  makeDocsURL
} = require("../utils");

const defaultElements = ["marquee", "blink"];

module.exports = {
  meta: {
    docs: {
      url: makeDocsURL("no-distracting-elements")
    },
    schema: [
      {
        type: "object",
        elements: {
          type: "array",
          items: {
            type: "string",
            enum: defaultElements
          }
        }
      }
    ]
  },
  create(context) {
    return defineTemplateBodyVisitor(context, {
      VElement(node) {
        const options = context.options[0] || {};

        const elementTypes = options.elements || defaultElements;
        const elementType =
          getLiteralAttributeValue(node, "is") || node.rawName;

        if (elementTypes.includes(elementType)) {
          context.report({
            node,
            message: `Do not use <${elementType}> elements as they can create visual accessibility issues and are deprecated.`
          });
        }
      }
    });
  }
};
