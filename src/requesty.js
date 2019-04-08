import request from "request"

export async function getSourceData(url) {
  var options = {
    url: url,
    header: {
      "User-Agent": "request"
    }
  };

  return new Promise(function(resolve, reject) {
    request.get(options, function(err, resp, body) {
      if (err) {
        reject(err)
      } else {
        resolve(JSON.parse(body))
      }
    });
  });
}

export function postWebHook(url, data) {
  request.post(
    url,
    {
      json: {
        posts: data
      }
    },
    (error, res, body) => {
      if (error) {
        console.error(error)
        return;
      }
      console.log(`statusCode: ${res.statusCode}`)
    }
  );
}