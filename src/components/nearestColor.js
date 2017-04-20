/* https://github.com/dtao/nearest-color */

export default nearestColor;

function nearestColor(needle, colors) {
  needle = parseColor(needle);
  if (!needle) {
    return null;
  }
  var distance,
    minDistance = Infinity,
    rgb,
    value;
  colors || (colors = nearestColor.DEFAULT_COLORS);
  for (var i = 0; i < colors.length; ++i) {
    rgb = colors[i].rgb;
    distance = Math.sqrt(Math.pow(needle.r - rgb.r, 2) +
      Math.pow(needle.g - rgb.g, 2) +
      Math.pow(needle.b - rgb.b, 2));
    if (distance < minDistance) {
      minDistance = distance;
      value = colors[i];
    }
  }
  return value.name ? {
      name: value.name,
      value: value.source,
      rgb: value.rgb
    } :
    value.source;
}
nearestColor.from = function from(availableColors) {
  var colors = mapColors(availableColors),
    nearestColorBase = nearestColor;
  var matcher = function nearestColor(hex) {
    return nearestColorBase(hex, colors);
  };
  matcher.from = from;
  matcher.or = function or(alternateColors) {
    var extendedColors = colors.concat(mapColors(alternateColors));
    return nearestColor.from(extendedColors);
  };
  return matcher;
};

function mapColors(colors) {
  if (colors instanceof Array) {
    return colors.map(function(color) {
      return createColorSpec(color);
    });
  }
  return Object.keys(colors).map(function(name) {
    return createColorSpec(colors[name], name);
  });
};
nearestColor.mapColors = mapColors

function parseColor(source) {
  var red,
    green,
    blue;
  if (typeof source === 'object') {
    return source;
  }
  if (source in nearestColor.STANDARD_COLORS) {
    return parseColor(nearestColor.STANDARD_COLORS[source]);
  }
  var hexMatch = source.match(/^#((?:[0-9a-f]{3}){1,2})$/i);
  if (hexMatch) {
    hexMatch = hexMatch[1];
    if (hexMatch.length === 3) {
      hexMatch = [hexMatch.charAt(0) + hexMatch.charAt(0), hexMatch.charAt(1) + hexMatch.charAt(1), hexMatch.charAt(2) + hexMatch.charAt(2)];
    } else {
      hexMatch = [hexMatch.substring(0, 2), hexMatch.substring(2, 4), hexMatch.substring(4, 6)];
    }
    red = parseInt(hexMatch[0], 16);
    green = parseInt(hexMatch[1], 16);
    blue = parseInt(hexMatch[2], 16);
    return {
      r: red,
      g: green,
      b: blue
    };
  }
  var rgbMatch = source.match(/^rgb\(\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?)\s*\)$/i);
  if (rgbMatch) {
    red = parseComponentValue(rgbMatch[1]);
    green = parseComponentValue(rgbMatch[2]);
    blue = parseComponentValue(rgbMatch[3]);
    return {
      r: red,
      g: green,
      b: blue
    };
  }
  return null;
}

function createColorSpec(input, name) {
  var color = {};
  if (name) {
    color.name = name;
  }
  if (typeof input === 'string') {
    color.source = input;
    color.rgb = parseColor(input);
  } else if (typeof input === 'object') {
    if (input.source) {
      return createColorSpec(input.source, input.name);
    }
    color.rgb = input;
    color.source = rgbToHex(input);
  }
  return color;
}

function parseComponentValue(string) {
  if (string.charAt(string.length - 1) === '%') {
    return Math.round(parseInt(string, 10) * 255 / 100);
  }
  return Number(string);
}

function rgbToHex(rgb) {
  return '#' + leadingZero(rgb.r.toString(16)) +
    leadingZero(rgb.g.toString(16)) + leadingZero(rgb.b.toString(16));
}

function leadingZero(value) {
  if (value.length === 1) {
    value = '0' + value;
  }
  return value;
}
nearestColor.STANDARD_COLORS = {
  aqua: '#0ff',
  black: '#000',
  blue: '#00f',
  fuchsia: '#f0f',
  gray: '#808080',
  green: '#008000',
  lime: '#0f0',
  maroon: '#800000',
  navy: '#000080',
  olive: '#808000',
  orange: '#ffa500',
  purple: '#800080',
  red: '#f00',
  silver: '#c0c0c0',
  teal: '#008080',
  white: '#fff',
  yellow: '#ff0'
};
nearestColor.DEFAULT_COLORS = mapColors(['#f00', '#f80', '#ff0', '#0f0', '#00f', '#008', '#808']);
nearestColor.VERSION = '0.4.0';