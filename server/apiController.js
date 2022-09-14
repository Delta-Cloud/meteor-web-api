import { LinksCollection } from "/imports/api/links";

const getHello = (req, res, next) => {
  res.writeHead(200);
  res.end(`Hello world from: ${Meteor.release}`);
};

const manageLink = (req, res, next) => {
  switch (req.method) {
    case "GET":
      let linkId = req.url.split("/")[1];
      if (linkId) {
        // link details
        getLink(req, res);
      } else {
        getLinks(req, res);
      }

      break;
    case "POST":
      // create link
      createLink(req, res);
      break;
    case "DELETE":
      // delete link
      deleteLink(req, res);
      break;
    default:
      writeResponse(res, 400, "Method not allowed");
      break;
  }
};

// GET
const getLinks = (req, res, next) => {
  const links = LinksCollection.find().fetch();
  writeResponse(res, 200, JSON.stringify(links));
};

// GET /link/:id
const getLink = (req, res) => {
  let linkId = req.url.split("/")[1];

  const link = LinksCollection.findOne({ _id: linkId });
  writeResponse(res, 200, JSON.stringify(link));
};

// POST   {
//     "title": "Do the Tutorial",
//     "url": "https://www.meteor.com/tutorials/react/creating-an-app",
//   }
const createLink = (req, res) => {
  const data = { ...req.body, createdAt: new Date() };

  const id = LinksCollection.insert(data);
  const result = LinksCollection.findOne({ _id: id });

  writeResponse(res, 200, JSON.stringify(result));
};
// DELETE /link/:id
const deleteLink = (req, res, next) => {
  let linkId = req.url.split("/")[1];

  const link = LinksCollection.findOne({ _id: linkId });

  if (link) {
    LinksCollection.remove({ _id: linkId });
    writeResponse(res, 200, "");
  } else {
    writeResponse(res, 404, "");
  }
};

const writeResponse = (res, code, data) => {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(code);
  res.end(data);
};

export default { getHello, manageLink };
