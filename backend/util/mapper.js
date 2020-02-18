const fs = require('fs');
const Location = require('../db/itemModel');

async function map(req, res, next) {
    let collection = req.params.collection;
    let callNumber = req.params.call_no;
    let status = req.params.status;

    res.json({
        map_image: await findMap(collection, callNumber),
        coordinates: await getCoords(callNumber)
    });
}

async function findMap(coll, callno) {
    switch (coll) {
        case "General Collection":
            if (strcmp(callno, "L") < 0) {
                return "SecondFloor.jpg";
            } else {
                return "ThirdFloor.jpg";
            }
            break;
        case "Periodicals":
        case "Reference":
            return "FirstFloor.jpg";
            break;
        case "Media DVD":
        case "Media Video":
        case "Media CD":
            return "SecondFloor.jpg";
            break;
        default:
            return "FirstFloor.jpg";
    }
}

async function getCoords(callno) {
    let coords;

    let a = await Location.findOne({
            'CallNumber': callno
        }, 'CoordX CoordY')
        .then(function(doc, err) {
            if (err) console.log(err);
            coords = [doc.CoordX, doc.CoordY];
        });

    return coords;

    /* old implemenation for CSV file
    await new Promise((resolve, reject) => {
        fs.createReadStream('./integrated.csv').pipe(csv.parse())
        .on("data", (data) => {
            let normal = normalize(callno);
                if(strcmp(normal, normalize(data[2])) < 0) {
            } else {
                console.log("HIT");
                resolve([data[3], data[4]]);
            }
        })
        .on("data-invalid", (data) => {
            console.log("There is an issue with the CSV file.");
        })
        .on("end", () => {
            console.log("ended");
        })
    }).then(function(val) {
        coords = val;
    }).catch((reason) => {
        console.log(reason);
    });
    */
}

function normalize(c) {
    let callnoArray = c.toLowerCase().match(/^([a-z]+) ?([\d\.]+) ?\.?([a-z0-9\.\- ]*)/g);
    if (callnoArray !== null) {
        callnoArray = callnoArray[0].split(" ");
        let classlet = callnoArray[0];
        let classno = callnoArray[1];
        let classrest = callnoArray[2];

        for (var i = 0; i < (3 - classlet.length); i++) {
            classlet = classlet.concat('0');
        }

        let spacefill = 0;
        classno.replace(/\.$/, '');
        if (classno.indexOf('.')) {
            spacefill = 4 - classno.indexOf('.');
        } else {
            spacefill = 4 - classno.length;
        }

        for (var i = 0; i < spacefill; i++) {
            classno = '0'.concat(classno);
        }

        return ''.concat(classlet, classno, ' ', classrest);
    }
}

function strcmp(str1, str2) {
    return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
}

module.exports = {
    map: map
};
