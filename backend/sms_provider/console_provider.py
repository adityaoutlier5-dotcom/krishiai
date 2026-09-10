import logging
from core.config import settings
from .provider_interface import SMSProvider

log = logging.getLogger("krishiai.sms_provider.console")

class ConsoleProvider(SMSProvider):
    def send_otp(self, phone_number: str, otp: str) -> bool:
        if not settings.DEBUG:
            raise RuntimeError("Console OTP delivery is only available when DEBUG=true")
        log.info("==========================================")
        log.info(" OTP GENERATED FOR PHONE +91%s: %s (via ConsoleProvider)", phone_number, otp)
        log.info("==========================================")
        print(f"\n[OTP]: {otp} (Sent to +91{phone_number})\n", flush=True)
        return True
