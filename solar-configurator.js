function calculate() {
    var electricity = parseFloat(document.getElementById('electricity').value);
    var month = parseInt(document.getElementById('month').value);
    var offGrid = parseFloat(document.getElementById('customer_off_grid').value);
    var backBatteryHours = parseInt(document.getElementById('back_battery_hours').value);
    var essentialLoad = parseFloat(document.getElementById('essential_load').value);

    if(isNaN(electricity) || electricity <= 0) {
        alert('Please enter a valid number for electricity usage.');
        return;
    }

    if(isNaN(offGrid) || offGrid < 0 || offGrid > 1) {
        alert('Please enter a valid number for the customer desired % to go off-grid. It should be a decimal number between 0 and 1.');
        return;
    }

    var monthlyUsageKwh = electricity / 2.2;
    var dailyAverageKwUsage = monthlyUsageKwh / month;
    var kwUsageVariance = monthlyUsageKwh / 0.75;
    var dailyKwhUsage = kwUsageVariance / month;
    var averageHourlyKwUsage = dailyKwhUsage / 22;
    var solarPanelRequirement = (((dailyKwhUsage * 1000) / 6.5) / 0.65) / 550;
    var pvArrayDesign = solarPanelRequirement * offGrid;
    var dailyPvGeneration = (((pvArrayDesign * 550) * 0.65) * 6.5) / 1000;

    var inverterSpec = "Consult Us";
    if(pvArrayDesign > 1 && pvArrayDesign < 8) {
        inverterSpec = "5KW Growatt";
    } else if(pvArrayDesign > 8 && pvArrayDesign < 12) {
        inverterSpec = "5KW Deye";
    } else if(pvArrayDesign > 12 && pvArrayDesign < 18.7) {
        inverterSpec = "8KW Deye";
    } else if(pvArrayDesign > 19 && pvArrayDesign < 22) {
        inverterSpec = "2x 5KW Deye";
    } else if(pvArrayDesign > 22.7 && pvArrayDesign < 36) {
        inverterSpec = "16KW Deye";
    }

    var suggestedBatteryStorageCapacity = (averageHourlyKwUsage * essentialLoad) * backBatteryHours;
    var suggestedBatteryModules = "Consult Us";
    if(suggestedBatteryStorageCapacity > 1 && suggestedBatteryStorageCapacity < 4.3) {
        suggestedBatteryModules = "5.1KW";
    } else if(suggestedBatteryStorageCapacity >= 4.3 && suggestedBatteryStorageCapacity <= 8.6) {
        suggestedBatteryModules = "2X 5.1KW";
    } else if(suggestedBatteryStorageCapacity > 8.7 && suggestedBatteryStorageCapacity < 13) {
        suggestedBatteryModules = "3X 5.1KW";
    }

    var generationToTotalKwUsageRatio = dailyPvGeneration / dailyKwhUsage;

    document.getElementById('monthly_usage_kwh').textContent = 'Monthly Usage Kwh: ' + Math.round(monthlyUsageKwh);
    document.getElementById('daily_average_kw_usage').textContent = 'Daily Average KWH Usage: ' + Math.round(dailyAverageKwUsage);
    document.getElementById('kw_usage_variance').textContent = 'KW Usage Incl. Loadshedding Variance @ 25%: ' + Math.round(kwUsageVariance);
    document.getElementById('daily_kwh_usage').textContent = 'Daily KWH Usage (variance): ' + Math.round(dailyKwhUsage);
    document.getElementById('average_hourly_kw_usage').textContent = 'Average Hourly KW Usage: ' + Math.round(averageHourlyKwUsage);
    document.getElementById('solar_panel_requirement').textContent = 'Solar Panel requirement to 100% off-Grid: ' + Math.round(solarPanelRequirement);
    document.getElementById('pv_array_design').textContent = 'PV Array Design: Panel Qty: ' + Math.round(pvArrayDesign);
    document.getElementById('daily_pv_generation').textContent = 'Daily Estimated PV Generation - KW: ' + Math.round(dailyPvGeneration);
    document.getElementById('inverter_specification').textContent = 'Inverter Suggested Specifications: ' + inverterSpec;
    document.getElementById('suggested_battery_storage_capacity').textContent = 'Suggested Battery Storage Capacity: ' + Math.round(suggestedBatteryStorageCapacity);
    document.getElementById('suggested_battery_modules').textContent = 'Suggested Battery Modules: ' + suggestedBatteryModules;
    document.getElementById('generation_to_total_kw_usage_ratio').textContent = 'Generation to Total KW Usage Ratio (%): ' + Math.round(generationToTotalKwUsageRatio*100) + '%';
}