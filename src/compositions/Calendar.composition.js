export const dayPhases = Object.freeze({
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
});

const dayPhasesNumber = Object.freeze({
  morning: 0,
  afternoon: 1,
  evening: 2,
  night: 3,
});

export const calendarComposition = {
  initCalendar(calendarStore, timeConfig) {
    calendarStore.morningInMs = timeConfig.morningInSec * 1000;
    calendarStore.afternoonInMs = timeConfig.afternoonInSec * 1000;
    calendarStore.eveningInMs = timeConfig.eveningInSec * 1000;
    calendarStore.nightInMs = timeConfig.nightInSec * 1000;

    calendarStore.totalElapsedTimeInMs =
      getElapsedMsBeforeDayPhase(calendarStore, timeConfig.startPhase) + 1 + getDayPhaseDuration(calendarStore, calendarStore.currentPhase) * timeConfig.startPhaseProgress;
    calendarComposition.updateCurrentTime(calendarStore, 0);
  },

  updateCurrentTime(calendarStore, deltaTimeInMs) {
    calendarStore.totalElapsedTimeInMs += deltaTimeInMs;
    calendarStore.msSinceDayStart = calendarStore.totalElapsedTimeInMs % getTotalDayDurationInMs(calendarStore);
    calendarStore.totalDays = Math.floor(calendarStore.totalElapsedTimeInMs / getTotalDayDurationInMs(calendarStore));

    if (calendarStore.msSinceDayStart <= calendarStore.morningInMs) calendarStore.currentPhase = dayPhases.morning;
    else if (calendarStore.msSinceDayStart <= getElapsedMsBeforeDayPhase(calendarStore, dayPhases.evening)) calendarStore.currentPhase = dayPhases.afternoon;
    else if (calendarStore.msSinceDayStart <= getElapsedMsBeforeDayPhase(calendarStore, dayPhases.night)) calendarStore.currentPhase = dayPhases.evening;
    else calendarStore.currentPhase = dayPhases.night;
  },

  isMorning(calendarStore) {
    return calendarStore.currentPhase === dayPhases.morning;
  },

  isAfternoon(calendarStore) {
    return calendarStore.currentPhase === dayPhases.afternoon;
  },

  isEvening(calendarStore) {
    return calendarStore.currentPhase === dayPhases.evening;
  },

  isNight(calendarStore) {
    return calendarStore.currentPhase === dayPhases.night;
  },

  isCurrentPhaseBetween(calendarStore, phaseStart, phaseEnd) {
    return dayPhasesNumber[phaseStart] <= dayPhasesNumber[calendarStore.currentPhase] && dayPhasesNumber[calendarStore.currentPhase] <= dayPhasesNumber[phaseEnd];
  },

  getCurrentPhaseProgress(calendarStore) {
    return getMsSincePhaseStart(calendarStore) / getDayPhaseDuration(calendarStore, calendarStore.currentPhase);
  },

  getDaysSince(calendarStore, startDay) {
    return calendarStore.totalDays - startDay;
  },
};


function getTotalDayDurationInMs(calendarStore) {
  return calendarStore.morningInMs + calendarStore.afternoonInMs + calendarStore.eveningInMs + calendarStore.nightInMs;
}

function getElapsedMsBeforeDayPhase(calendarStore, dayPhase) {
  if (dayPhase === dayPhases.morning) return 0;
  else if (dayPhase === dayPhases.afternoon) return calendarStore.morningInMs;
  else if (dayPhase === dayPhases.evening) return calendarStore.morningInMs + calendarStore.afternoonInMs;
  else return calendarStore.morningInMs + calendarStore.afternoonInMs + calendarStore.eveningInMs;
}

function getDayPhaseDuration(calendarStore, dayPhase) {
  if (dayPhase === dayPhases.morning) return calendarStore.morningInMs;
  else if (dayPhase === dayPhases.afternoon) return calendarStore.afternoonInMs;
  else if (dayPhase === dayPhases.evening) return calendarStore.eveningInMs;
  else return calendarStore.nightInMs;
}

function getMsSincePhaseStart(calendarStore) {
  return calendarStore.msSinceDayStart - getElapsedMsBeforeDayPhase(calendarStore, calendarStore.currentPhase);
}