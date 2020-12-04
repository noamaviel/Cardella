export const utilService = {
    makeId,
    applyDrag,
    generateItems
}


function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function applyDrag(arr, dragResult) {
    const { removedIndex, addedIndex, payload } = dragResult
    if (removedIndex === null && addedIndex === null) return arr
    const result = [...arr]

    let itemToAdd;
    if (payload) {
        itemToAdd = payload;
    }
    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
    }

    return result
}

function generateItems(count, creator) {
    const result = []
    for (let i = 0; i < count; i++) {
        result.push(creator(i))
    }
    return result
}

  //Example for using generateItems

//   const scene = {
//     type: "container",
//     props: {
//         orientation: "horizontal",
//     },
//     children: generateItems(4, (i) => ({
//         id: `column${i}`,
//         type: "container",
//         name: columnNames[i],
//         props: {
//             orientation: "vertical",
//             className: "card-container",
//         },
//         children: generateItems(+(Math.random() * 10).toFixed() + 5, (j) => ({
//             type: "draggable",
//             id: `${i}${j}`,
//             props: {
//                 className: "card",
//                 style: { backgroundColor: pickColor() },
//             },
//             data: lorem.slice(0, Math.floor(Math.random() * 150) + 30),
//         })),
//     })),
// };