import dm from 'dm.dll';

dm.BindWindow = (hwnd, display, mouse, keypad, mode) => {
  return dm.dll.BindWindow(hwnd, display, mouse, keypad, mode);
};

dm.BindWindowEx = (hwnd, display, mouse, keypad, dx_public, mode) => {
  return dm.dll.BindWindowEx(hwnd, display, mouse, keypad, dx_public, mode);
};

dm.Capture = (x1, y1, x2, y2, file) => {
  return dm.dll.Capture(x1, y1, x2, y2, file);
};

dm.CaptureJpg = (x1, y1, x2, y2, file) => {
  return dm.dll.CaptureJpg(x1, y1, x2, y2, file, 100);
};

dm.CreateFoobarRect = (hwnd, x, y, w, h) => {
  return dm.dll.CreateFoobarRect(hwnd, x, y, w, h);
};

dm.EnumWindow = (parent, title, class_name, filter) => {
  return dm.dll.EnumWindow(parent, title, class_name, filter);
};

dm.EnumWindowByProcess = (process_name, title, class_name, filter) => {
  return dm.dll.EnumWindowByProcess(process_name, title, class_name, filter);
};

dm.FetchWord = (x1, y1, x2, y2, color, word) => {
  return dm.dll.FetchWord(x1, y1, x2, y2, color, word);
};

dm.FindPicE = (x1, y1, x2, y2, pic_name, delta_color, sim, dir) => {
  return dm.dll.FindPicE(x1, y1, x2, y2, pic_name, delta_color, sim, dir);
};

dm.FindStrE = (x1, y1, x2, y2, string, color_format, sim) => {
  return dm.dll.FindStrE(x1, y1, x2, y2, string, color_format, sim);
};

dm.FindWindow = (class_name, title) => {
  return dm.dll.FindWindow(class_name, title);
};

dm.FindWindowEx = (parent, class_name, title) => {
  return dm.dll.FindWindowEx(parent, class_name, title);
};

dm.FoobarClose = hwnd => {
  return dm.dll.FoobarClose(hwnd);
};

dm.GetColor = (x, y) => {
  return dm.dll.GetColor(x, y);
};

dm.GetWindow = (hwnd, flag) => {
  return dm.dll.GetWindow(hwnd, flag);
};

dm.KeyDownChar = key_str => {
  return dm.dll.KeyDownChar(key_str);
};

dm.KeyPressChar = key_str => {
  return dm.dll.KeyPressChar(key_str);
};

dm.KeyUpChar = key_str => {
  return dm.dll.KeyUpChar(key_str);
};

dm.LeftClick = () => {
  return dm.dll.LeftClick();
};

dm.LeftDoubleClick = () => {
  return dm.dll.LeftDoubleClick();
};

dm.LeftDown = () => {
  return dm.dll.LeftDown();
};

dm.LeftUp = () => {
  return dm.dll.LeftUp();
};

dm.MoveToEx = (x, y, w, h) => {
  return dm.dll.MoveToEx(x, y, w, h);
};

dm.MoveTo = (x, y) => {
  return dm.dll.MoveTo(x, y);
};

dm.Ocr = (x1, y1, x2, y2, color_format, sim) => {
  return dm.dll.Ocr(x1, y1, x2, y2, color_format, sim);
};

dm.Play = media_file => {
  return dm.dll.Play(media_file);
};

dm.RightClick = () => {
  return dm.dll.RightClick();
};

dm.RightDown = () => {
  return dm.dll.RightDown();
};

dm.RightUp = () => {
  return dm.dll.RightUp();
};

dm.SendString = (hwnd, text) => {
  return dm.dll.SendString(hwnd, text);
};

dm.SetDict = (index, file) => {
  return dm.dll.SetDict(index, file);
};

dm.SetWindowSize = (hwnd, width, height) => {
  return dm.dll.SetWindowSize(hwnd, width, height);
};

dm.UseDict = index => {
  return dm.dll.UseDict(index);
};

export default dm;
