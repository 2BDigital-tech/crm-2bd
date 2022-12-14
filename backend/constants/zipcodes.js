const zipMap = new Map();

zipMap.set("Metz", [
  "57920",
  "57380",
  "57590",
  "57130",
  "57440",
  "57640",
  "57320",
  "57390",
  "57570",
  "57660",
  "57200",
  "57220",
  "57420",
  "57530",
  "57480",
  "57850",
  "57550",
  "57970",
  "57290",
  "57450",
  "57190",
  "57650",
  "57790",
  "57910",
  "57700",
  "57330",
  "57510",
  "57990",
  "57410",
  "57830",
  "57670",
  "57050",
  "57280",
  "57070",
  "57250",
  "57645",
  "57680",
  "57890",
  "57445",
  "57310",
  "57255",
  "57905",
  "57350",
  "57100",
  "57385",
  "57870",
  "57185",
  "57140",
  "57515",
  "57865",
  "57710",
  "57730",
  "57360",
  "57655",
  "57300",
  "57535",
  "57160",
  "57800",
  "57460",
  "57565",
  "57635",
  "57365",
  "57245",
  "57600",
  "57520",
  "57980",
  "57690",
  "57470",
  "57815",
  "57240",
  "57880",
  "57960",
  "57940",
  "57740",
  "57860",
  "57155",
  "57270",
  "57540",
  "57180",
  "57500",
  "57525",
  "57490",
  "57150",
  "57925",
  "57175",
  "57935",
  "57000",
  "57770",
  "57120",
  "57780",
  "57855",
  "57455",
  "57915",
  "57685",
  "57950",
]);

zipMap.set("Nancy", [
  "54800",
  "54170",
  "54260",
  "54760",
  "54510",
  "54385",
  "54370",
  "54740",
  "54470",
  "54640",
  "54620",
  "54115",
  "54560",
  "54200",
  "54700",
  "54113",
  "54290",
  "54610",
  "54120",
  "54280",
  "54230",
  "54122",
  "54210",
  "54300",
  "54720",
  "54930",
  "54770",
  "54490",
  "54680",
  "54830",
  "54150",
  "54380",
  "54450",
  "54860",
  "54440",
  "54330",
  "54360",
  "54950",
  "54520",
  "54690",
  "54110",
  "54460",
  "54810",
  "54400",
  "54220",
  "54135",
  "54350",
  "54118",
  "54540",
  "54580",
  "54190",
  "54500",
  "54112",
  "54730",
  "54870",
  "54890",
  "54630",
  "54710",
  "54160",
  "54780",
  "54550",
  "54940",
  "54310",
  "54140",
  "54240",
  "54570",
  "54410",
  "54320",
  "54270",
  "54920",
  "54840",
  "54660",
  "54530",
  "54116",
  "54114",
  "54430",
  "54480",
  "54600",
  "54340",
  "54425",
  "54990",
  "54650",
  "54880",
  "54134",
  "54980",
  "54111",
  "54136",
  "54790",
  "54670",
  "54119",
  "54180",
  "54970",
  "54129",
  "54820",
  "54960",
  "54850",
  "54000",
  "54420",
  "54750",
  "54121",
  "54250",
  "54130",
  "54390",
  "54590",
  "54100",
  "54910",
  "54123",
]);
zipMap.set("Toulon", [
  "83150",
  "83230",
  "83320",
  "83240",
  "83310",
  "83610",
  "83390",
  "83580",
  "83400",
  "83740",
  "83260",
  "83420",
  "83210",
  "83130",
  "83680",
  "83250",
  "83500",
  "83160",
  "83140",
  "83980",
  "83220",
  "83200",
  "83190",
  "83350",
  "83820",
  "83430",
  "83110",
  "83000",
  "83100",
]);
zipMap.set("Strasbourg", [
  "67320",
  "67310",
  "67440",
  "67140",
  "67390",
  "67250",
  "67130",
  "67230",
  "67170",
  "67370",
  "67360",
  "67720",
  "67113",
  "67860",
  "67420",
  "67220",
  "67260",
  "67770",
  "67650",
  "67490",
  "67430",
  "67330",
  "67160",
  "67410",
  "67470",
  "67700",
  "67350",
  "67120",
  "67150",
  "67580",
  "67290",
  "67110",
  "67690",
  "67270",
  "67600",
  "67880",
  "67630",
  "67480",
  "67640",
  "67670",
  "67280",
  "67207",
  "67510",
  "67520",
  "67660",
  "67240",
  "67340",
  "67590",
  "67540",
  "67115",
  "67560",
  "67570",
  "67750",
  "67790",
  "67920",
  "67210",
  "67730",
  "67500",
  "67930",
  "67870",
  "67201",
  "67550",
  "67114",
  "67117",
  "67980",
  "67190",
  "67850",
  "67450",
  "67800",
  "67206",
  "67970",
  "67118",
  "67810",
  "67400",
  "67820",
  "67380",
  "67680",
  "67205",
  "67990",
  "67530",
  "67000",
  "67112",
  "67710",
  "67840",
  "67620",
  "67202",
  "67204",
  "67960",
  "67760",
  "67203",
  "67116",
  "67300",
  "67460",
  "67100",
  "67200",
  "67610",
]);
zipMap.set("Paris", [
  "75003",
  "75012",
  "75005",
  "75008",
  "75011",
  "75016",
  "75020",
  "75009",
  "75010",
  "75013",
  "75018",
  "75019",
  "75002",
  "75015",
  "75116",
  "75001",
  "75004",
  "75006",
  "75007",
  "75014",
  "75017",
]);

module.exports = Object.freeze({ zipMap });
