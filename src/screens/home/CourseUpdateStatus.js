/*
import Realm from 'realm';
import {BluetoothContext} from '../../components/BluetoothBoundary';
import Base64 from 'base-64';
import {stringToBytes} from 'convert-string';
var base64js = require('base64-js');
import BleManager from 'react-native-ble-manager';
import {goBack} from '../../utils/helpers/RootNaivgation';
import ProgressBar from 'react-native-animated-progress';
var CRC32 = require('crc-32');
var ByteBuffer = require('bytebuffer');

var status;
let can_write_data = false;

export default function SelectCoursetoReport(props) {


  let settings_db = realm.objects('settings');
  const factor = 0.621371;

  function backAction() {
    can_write_data = false;
    return loading ? true : false;
  }

  function UInt16(value) {
    return value & 0xffff;
  }

  function convertDecimalToBinary(decimalNumber) {
    if (!isNaN(decimalNumber)) return (decimalNumber >>> 0).toString(2);
    return false;
  }

  function bin_to_dec(bstr) {
    return parseInt((bstr + '').replace(/[^01]/gi, ''), 2);
  }

  function getTotalPacketCount(_courseDataSize, _coursePayloadSize) {
    
    // If the remainder of the division
    // != 0, totalPacketCount should be increased by 1
    

    //console.log('_cs', _ts, _cs);

    let _division = Math.floor(_courseDataSize / _coursePayloadSize);
    let _remainder = (_courseDataSize + 1) % _coursePayloadSize;

    //console.log('_division,_remainder', _division, _remainder);

    if (_remainder == 0) {
      //let _totalPacketCount = _division + 1;
      return 0 + _division;
    } else {
      return 1 + _division;
    }
  }

  function getCourseHeader(courseData, id_course, idx, bCustom) {
    let crc = CRC32.buf(courseData);
    let _bCustom = bCustom == 1 ? 1 : 0;
    const b = new ByteBuffer(36, ByteBuffer.LITTLE_ENDIAN);
    b.writeInt(0x0000);
    b.writeInt(courseData.length);
    b.writeInt(0);
    b.writeInt(crc);
    b.writeByte(0x01); // 0x01.toByte()
    b.writeShort(id_course);
    b.writeShort(idx);
    b.writeByte(_bCustom);

    var byteArray = new Uint8Array(b.buffer);

    var array = Array.from(byteArray);

    //console.log('array __ --- > ', array);

    return array; // byteArray
  }

  function writeCourseDataPackets(courseData) {
    let packetNumber = 1;

    let coursePayloadSize = MTU - 4 - 3;
    let totalPacketsCount = getTotalPacketCount(
      courseData.length,
      coursePayloadSize,
    );
    //progress = parseInt((packetNumber * 100) / totalPacketsCount);
    //setProgress(parseInt((packetNumber * 100) / totalPacketsCount));

    const bb = new ByteBuffer(MTU - 3, ByteBuffer.LITTLE_ENDIAN);

    writeCoursePacketsOneByOne(
      courseData,
      bb,
      0,
      packetNumber,
      totalPacketsCount,
    );
  }

  function writeCoursePacketsOneByOne(
    courseData,
    bb,
    cursorPositionIn,
    packetNumberIn,
    totalPacketCount,
  ) {
    var cursorPosition = cursorPositionIn;
    var packetNumber = packetNumberIn;

    if (cursorPosition < courseData.length && can_write_data) {
      bb.clear();
      bb.writeInt(packetNumber);

      var j = 4;
      while (j < MTU - 3 && cursorPosition < courseData.length) {
        bb.writeByte(courseData[cursorPosition]);
        ++j;
        ++cursorPosition;
      }

      var _array = new Uint8Array(bb.clone().buffer);

      var clone_array = Array.from(_array);

      context.write(
        props.route.params.peripheral_id, //peripheral_id
        _serviceUDID_write, // serviceUUID
        _characUDID_write, //characteristicUUID
        clone_array,
        clone_array.length,
        val => {
          if (val != false) {
            //setProgress(parseInt((packetNumber * 100) / totalPacketCount));
            ++packetNumber;
            if (packetNumber < totalPacketCount) {
              writeCoursePacketsOneByOne(
                courseData,
                bb,
                cursorPosition,
                packetNumber,
                totalPacketCount,
              );
            } else {
              writeCourseLastPacket(
                courseData,
                cursorPosition,
                packetNumber,
                totalPacketCount,
              );
            }
          } else {
            setLoading(false);
          }
        },
      );
    } else {
      if (cursorPosition == courseData.length) {
        setLoading(false);
      } else {
      }
    }
  }

  function writeCourseLastPacket(
    courseData,
    cursorPositionIn,
    packetNumberIn,
    totalPacketCount,
  ) {
    const bb = new ByteBuffer(
      courseData.length - cursorPositionIn + 4,
      ByteBuffer.LITTLE_ENDIAN,
    );

    var cursorPosition = cursorPositionIn;
    var packetNumber = packetNumberIn;

    if (cursorPosition < courseData.length) {
      bb.clear();
      bb.writeInt(packetNumber);

      var j = 4;
      while (j < MTU - 3 && cursorPosition < courseData.length) {
        bb.writeByte(courseData[cursorPosition]);
        ++j;
        ++cursorPosition;
      }

      var _array = new Uint8Array(bb.clone().buffer);

      var clone_array = Array.from(_array);

      context.write(
        props.route.params.peripheral_id, //peripheral_id
        _serviceUDID_write, // serviceUUID
        _characUDID_write, //characteristicUUID
        clone_array,
        clone_array.length,
        val => {
          if (val != false) {
            //setProgress(parseInt((packetNumber * 100) / totalPacketCount));
            ++packetNumber;
            if (packetNumber < totalPacketCount) {
              writeCoursePacketsOneByOne(
                courseData,
                bb,
                cursorPosition,
                packetNumber,
                totalPacketCount,
              );
            } else {
              writeCourseLastPacket(
                courseData,
                cursorPosition,
                packetNumber,
                totalPacketCount,
              );
            }
            //console.log('cursorPosition', cursorPosition);
          } else {
            setLoading(false);
          }
        },
      );
    } else {
      if (cursorPosition == courseData.length) {
        setisfocused(false);
        realms.write(() => {
          realms.create('update_course', {
            id_course: course_id,
            success: true,
          });
        });
        setLoading(false);
      } else {
        setisfocused(false);

        realms.write(() => {
          realms.create('update_course', {
            id_course: course_id,
            success: false,
          });
        });
        setLoading(false);
      }
    }
  }


  function updateCourse(res) {

    console.log('updateCourse ---- ',res);

    let courseData = base64js.toByteArray(res?.glfCourse?.glf);

    let totalCourses = res.totalCourses;

    let course_Id = res.id_course;
    let course_Index = res.glfCourse.index;
    let custom_course_flag = res.bCustom;

    let headerArr = getCourseHeader(
      courseData,
      course_Id,
      course_Index,
      custom_course_flag,
    );

    if (totalCourses != devicecounts) {
      let obj = {
        courseCount: devicecounts,
        serialNumber: props.route.params.serialNumber,
      };
      // console.log('obj', obj);
      connectionrequest()
        .then(() => {
          dispatch(updateCourseCountRequest(obj));
        })
        .catch(err => {
          console.log(err);
          Toast('Please connect your internet');
        });
    } else if (totalCourses == devicecounts) {
      can_write_data = true;

      context.write(
        props.route.params.peripheral_id, //peripheral_id
        _serviceUDID_write, // serviceUUID
        _characUDID_write, //characteristicUUID
        headerArr,
        headerArr.length,
        val => {
          if (val != false) {
            writeCourseDataPackets(courseData);
          } else {
            setLoading(false);
          }
        },
      );
    }
  }

  const onChangeSearch = useCallback(
    _.debounce(val => {
      if (val == '') {
        let obj = {
          active: 1,
          page: 1,
          resultsPerPage: 50,
          radius: 20,
          // referenceLongitude: 88.427595,
          // referenceLatitude: 22.575248,
          referenceLongitude: currentLongitude,
          referenceLatitude: currentLatitude,
        };
        dispatch(courseListToReportRequest(obj));
      } else {
        let obj = {
          // active: 1,
          // page: 1,
          // resultsPerPage: 99,
          // radius: 20,
          courseName: val,
          active: 1,
          page: 1,
          resultsPerPage: 50,

          // referenceLongitude: currentLongitude,
          // referenceLatitude: currentLatitude,
        };
        let obj1 = {
          // active: 1,
          // page: 1,
          // resultsPerPage: 99,
          // radius: 20,
          cityName: val,
          active: 1,
          page: 1,
          results: 3,

          // referenceLongitude: currentLongitude,
          // referenceLatitude: currentLatitude,
        };

        dispatch(searchcourseListToReportRequest(obj));
        dispatch(searchCityListToReportRequest(obj1));
      }
    }, 800),
  );

  function loadMoreData() {
    if (search == '') {
      let obj = {
        active: 1,
        page: ReportMappingReducer.page_no + 1,
        resultsPerPage: 50,
        radius: 20,
        // referenceLongitude: 88.427595,
        // referenceLatitude: 22.575248,
        referenceLongitude: currentLongitude,
        referenceLatitude: currentLatitude,
      };
      dispatch(courseListToReportRequest(obj));
    } else {
      let obj = {
        // active: 1,
        // page: 1,
        // resultsPerPage: 99,
        // radius: 20,
        courseName: search,
        active: 1,
        page: ReportMappingReducer.page_no + 1,
        resultsPerPage: 50,

        // referenceLongitude: currentLongitude,
        // referenceLatitude: currentLatitude,
      };

      dispatch(searchcourseListToReportRequest(obj));
    }
  }


}

*/
