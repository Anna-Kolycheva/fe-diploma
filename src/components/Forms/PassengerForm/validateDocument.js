export default function validateDocument(type, value) {
   switch (type) {
      case 'series':
         return !!value.match(/^\d{4}$/);
      case 'passport':
         return !!value.match(/^\d{6}$/);
      case 'certificate':
         return !!value.match(/^\d{12}$/);
      default:
         return false;
   }
}
