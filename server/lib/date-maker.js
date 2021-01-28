
// returns Vancouver-based date in basic numeric format without frills
const dateMaker = function() {
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const offset = -8;
  const vancouver = utc + (3600000 * offset)
  const nd = new Date(vancouver);

  const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'

  }

  return nd.toLocaleDateString('en-US', options);
}

// returns Vancouver-based time in basic numeric format without frills
const timeMaker = function() {
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const offset = -8;
  const vancouver = utc + (3600000 * offset);
  const nd = new Date(vancouver);
  
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }

  return nd.toLocaleTimeString('en-US', options);
}

module.exports = { dateMaker, timeMaker };