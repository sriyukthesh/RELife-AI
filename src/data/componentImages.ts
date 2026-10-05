import esp32Img from '../assets/images/esp32_devkit_1791212725868.jpg';
import arduinoUnoImg from '../assets/images/arduino_uno_1791212743987.jpg';
import hcsr04Img from '../assets/images/hcsr04_sensor_1791212761671.jpg';
import dht22Img from '../assets/images/dht22_sensor_1791212778770.jpg';
import sg90Img from '../assets/images/sg90_servo_1791212796025.jpg';
import oledImg from '../assets/images/oled_display_1791212816815.jpg';
import l298nImg from '../assets/images/l298n_driver_1791212833865.jpg';
import relayImg from '../assets/images/relay_module_1791212850359.jpg';
import raspberryPiImg from '../assets/images/raspberry_pi_1791212871456.jpg';
import yellowMotorImg from '../assets/images/yellow_tt_motor_1791212890959.jpg';
import mq2Img from '../assets/images/mq2_gas_sensor_1791212914629.jpg';
import pirImg from '../assets/images/pir_motion_sensor_1791212932154.jpg';
import soilImg from '../assets/images/soil_sensor_1791212949160.jpg';

export const COMPONENT_IMAGES = {
  esp32: esp32Img,
  arduinoUno: arduinoUnoImg,
  hcsr04: hcsr04Img,
  dht22: dht22Img,
  sg90: sg90Img,
  oled: oledImg,
  l298n: l298nImg,
  relay: relayImg,
  raspberryPi: raspberryPiImg,
  yellowMotor: yellowMotorImg,
  mq2: mq2Img,
  pir: pirImg,
  soil: soilImg
};

export function getComponentImage(name: string, category?: string): { front: string; back: string } {
  const q = name.toLowerCase();

  if (q.includes('esp32') || q.includes('wroom') || q.includes('nodemcu')) {
    return { front: COMPONENT_IMAGES.esp32, back: COMPONENT_IMAGES.esp32 };
  }
  if (q.includes('arduino') || q.includes('atmega') || q.includes('nano')) {
    return { front: COMPONENT_IMAGES.arduinoUno, back: COMPONENT_IMAGES.arduinoUno };
  }
  if (q.includes('raspberry') || q.includes('rpi') || q.includes('pi 4') || q.includes('pi 3')) {
    return { front: COMPONENT_IMAGES.raspberryPi, back: COMPONENT_IMAGES.raspberryPi };
  }
  if (q.includes('ultrasonic') || q.includes('hc-sr04') || q.includes('distance')) {
    return { front: COMPONENT_IMAGES.hcsr04, back: COMPONENT_IMAGES.hcsr04 };
  }
  if (q.includes('dht') || q.includes('am2302') || q.includes('temp') || q.includes('humidity')) {
    return { front: COMPONENT_IMAGES.dht22, back: COMPONENT_IMAGES.dht22 };
  }
  if (q.includes('servo') || q.includes('sg90') || q.includes('mg996') || q.includes('sg-90')) {
    return { front: COMPONENT_IMAGES.sg90, back: COMPONENT_IMAGES.sg90 };
  }
  if (q.includes('oled') || q.includes('ssd1306') || q.includes('lcd') || q.includes('display')) {
    return { front: COMPONENT_IMAGES.oled, back: COMPONENT_IMAGES.oled };
  }
  if (q.includes('l298n') || q.includes('motor driver') || q.includes('h-bridge')) {
    return { front: COMPONENT_IMAGES.l298n, back: COMPONENT_IMAGES.l298n };
  }
  if (q.includes('relay') || q.includes('srd-05') || q.includes('channel relay')) {
    return { front: COMPONENT_IMAGES.relay, back: COMPONENT_IMAGES.relay };
  }
  if (q.includes('gas') || q.includes('mq-2') || q.includes('mq2') || q.includes('smoke')) {
    return { front: COMPONENT_IMAGES.mq2, back: COMPONENT_IMAGES.mq2 };
  }
  if (q.includes('pir') || q.includes('motion') || q.includes('infrared') || q.includes('hc-sr501')) {
    return { front: COMPONENT_IMAGES.pir, back: COMPONENT_IMAGES.pir };
  }
  if (q.includes('soil') || q.includes('moisture')) {
    return { front: COMPONENT_IMAGES.soil, back: COMPONENT_IMAGES.soil };
  }
  if (q.includes('motor') || q.includes('geared') || q.includes('wheel') || q.includes('tt')) {
    return { front: COMPONENT_IMAGES.yellowMotor, back: COMPONENT_IMAGES.yellowMotor };
  }

  // Fallback by category
  if (category === 'Microcontrollers') return { front: COMPONENT_IMAGES.esp32, back: COMPONENT_IMAGES.esp32 };
  if (category === 'Sensors') return { front: COMPONENT_IMAGES.hcsr04, back: COMPONENT_IMAGES.hcsr04 };
  if (category === 'Motors') return { front: COMPONENT_IMAGES.sg90, back: COMPONENT_IMAGES.sg90 };
  if (category === 'Displays') return { front: COMPONENT_IMAGES.oled, back: COMPONENT_IMAGES.oled };
  if (category === 'Power Components') return { front: COMPONENT_IMAGES.l298n, back: COMPONENT_IMAGES.l298n };

  return { front: COMPONENT_IMAGES.esp32, back: COMPONENT_IMAGES.esp32 };
}
