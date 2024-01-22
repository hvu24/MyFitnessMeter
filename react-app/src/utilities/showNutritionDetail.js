export const showNutrientDetail = (id, carbGoal, fatGoal, proteinGoal) => {
    let detail = {
        'name': '',
        'unit': ''
    }
    switch (id) {
        // case 208:
        //     detail.name = 'Energy'
        //     detail.unit = 'kcal'
        //     break
        case 221:
            detail.name = 'Alcohol'
            detail.unit = 'g'
            detail.target = 0
            break
        case 262:
            detail.name = 'Caffeine'
            detail.unit = 'mg'
            detail.target = 0
            break
        case 255:
            detail.name = 'Water'
            detail.unit = 'g'
            detail.target = 3700
            break
        case 291:
            detail.name = 'Fiber'
            detail.unit = 'g'
            detail.target = 38
            break
        case 209:
            detail.name = 'Starch'
            detail.unit = 'g'
            detail.target = 0
            break
        case 269:
            detail.name = 'Sugars'
            detail.unit = 'g'
            detail.target = 0
            break
        case 205:
            detail.name = 'Net carbs'
            detail.unit = 'g'
            detail.target = carbGoal
            break
        case 204:
            detail.name = 'Total fat'
            detail.unit = 'g'
            detail.target = fatGoal
            break
        case 645:
            detail.name = 'Monounsaturated fat'
            detail.unit = 'g'
            detail.target = 0
            break
        case 646:
            detail.name = 'Polyunsaturated fat'
            detail.unit = 'g'
            detail.target = 0
            break
        case 619:
            detail.name = 'Alphalinolenic acid'
            detail.unit = 'g'
            detail.target = 2
            break
        case 629:
            detail.name = 'Eicosapentaenoic acid'
            detail.unit = 'g'
            detail.target = 0.25
            break
        case 621:
            detail.name = 'Docosahexaenoic acid'
            detail.unit = 'g'
            detail.target = 0.25
            break
        case 618:
            detail.name = 'Linoleic acid'
            detail.unit = 'g'
            detail.target = 10
            break
        case 620:
            detail.name = 'Arachidonic acid'
            detail.unit = 'g'
            detail.target = 7
            break
        case 606:
            detail.name = 'Saturated fat'
            detail.unit = 'g'
            detail.target = 0
            break
        case 605:
            detail.name = 'Trans fat'
            detail.unit = 'g'
            detail.target = 0
            break
        case 601:
            detail.name = 'Cholesterol'
            detail.unit = 'mg'
            detail.target = 0
            break
        case 203:
            detail.name = 'Total protein'
            detail.unit = 'g'
            detail.target = proteinGoal
            break
        case 512:
            detail.name = 'Histidine'
            detail.unit = 'g'
            detail.target = 1.1
            break
        case 503:
            detail.name = 'Isoleucine'
            detail.unit = 'g'
            detail.target = 1.5
            break
        case 504:
            detail.name = 'Leucine'
            detail.unit = 'g'
            detail.target = 3.3
            break
        case 505:
            detail.name = 'Lysine'
            detail.unit = 'g'
            detail.target = 3
            break
        case 506:
            detail.name = 'Methionine'
            detail.unit = 'g'
            detail.target = 0.8
            break
        case 508:
            detail.name = 'Phenylalanine'
            detail.unit = 'g'
            detail.target = 1.3
            break
        case 502:
            detail.name = 'Threonine'
            detail.unit = 'g'
            detail.target = 1.6
            break
        case 501:
            detail.name = 'Tryptophan'
            detail.unit = 'g'
            detail.target = 0.4
            break
        case 510:
            detail.name = 'Valine'
            detail.unit = 'g'
            detail.target = 1.9
            break
        case 404:
            detail.name = 'Vitamin b1'
            detail.unit = 'mg'
            detail.target = 1.2
            break
        case 405:
            detail.name = 'Vitamin b2'
            detail.unit = 'mg'
            detail.target = 1.3
            break
        case 406:
            detail.name = 'Vitamin b3'
            detail.unit = 'mg'
            detail.target = 16
            break
        case 410:
            detail.name = 'Vitamin b5'
            detail.unit = 'mg'
            detail.target = 5
            break
        case 415:
            detail.name = 'Vitamin b6'
            detail.unit = 'mg'
            detail.target = 1.3
            break
        case 418:
            detail.name = 'Vitamin b12'
            detail.unit = 'Aug'
            detail.target = 2.4
            break
        case 417:
            detail.name = 'Folate'
            detail.unit = 'Aug'
            detail.target = 400
            break
        case 320:
            detail.name = 'Vitamin a'
            detail.unit = 'Aug'
            detail.target = 900
            break
        case 401:
            detail.name = 'Vitamin c'
            detail.unit = 'mg'
            detail.target = 90
            break
        case 324:
            detail.name = 'Vitamin d'
            detail.unit = 'iu'
            detail.target = 600
            break
        case 323:
            detail.name = 'Vitamin e'
            detail.unit = 'mg'
            detail.target = 15
            break
        case 430:
            detail.name = 'Vitamin k'
            detail.unit = 'Aug'
            detail.target = 120
            break
        case 301:
            detail.name = 'Calcium'
            detail.unit = 'mg'
            detail.target = 1000
            break
        case 312:
            detail.name = 'Copper'
            detail.unit = 'mg'
            detail.target = 0.9
            break
        case 303:
            detail.name = 'Iron'
            detail.unit = 'mg'
            detail.target = 8
            break
        case 304:
            detail.name = 'Magnesium'
            detail.unit = 'mg'
            detail.target = 400
            break
        case 315:
            detail.name = 'Manganese'
            detail.unit = 'mg'
            detail.target = 2.3
            break
        case 305:
            detail.name = 'Phosphorus'
            detail.unit = 'mg'
            detail.target = 700
            break
        case 306:
            detail.name = 'Potassium'
            detail.unit = 'mg'
            detail.target = 3400
            break
        case 317:
            detail.name = 'Selenium'
            detail.unit = 'Aug'
            detail.target = 55
            break
        case 307:
            detail.name = 'Sodium'
            detail.unit = 'mg'
            detail.target = 1500
            break
        case 309:
            detail.name = 'Zinc'
            detail.unit = 'mg'
            detail.target = 11
            break
        default:
            detail.name = 'none'
            detail.unit = 'none'
            detail.target = 0
            break
    }

    return detail
}
